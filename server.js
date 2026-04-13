const express = require('express');
const morgan = require('morgan');
const routes = require('./src/routes');
const errorHandler = require('./src/middlewares/errorHandler'); // Импорт

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);

// 1. Обработка 404 (если маршрут не найден)
app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error); // Передаем ошибку дальше
});

// 2. Единый обработчик всех ошибок (должен быть последним!)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

