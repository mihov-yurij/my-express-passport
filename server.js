const express = require('express');
const morgan = require('morgan');
const path = require('path');
const routes = require('./src/routes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
const PORT = 3000;

// 1. Логирование и парсинг JSON
app.use(morgan('dev'));
app.use(express.json());

// 2. Настройка папки шаблонов и движков (Pug и EJS)
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'pug');
app.engine('ejs', require('ejs').renderFile);

// 3. Подключение статики (CSS, картинки)
app.use(express.static(path.join(__dirname, 'public')));

// --- МАРШРУТЫ (ROUTES) ---

// Главная страница (теперь она ПЕРЕД обработчиком 404)
app.get('/', (req, res) => {
  res.send('<h1>Сервер успешно работает!</h1>');
});

// API маршруты
app.use('/api', routes);

// --- ОБРАБОТКА ОШИБОК (Всегда в конце) ---

// 1. Обработка 404 (если маршрут не найден выше)
app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error); 
});

// 2. Единый обработчик всех ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



