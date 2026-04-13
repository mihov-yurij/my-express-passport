const express = require('express');
const routes = require('./routes');

const app = express();

// Мидлвар для парсинга JSON (на случай, если будешь слать POST-запросы с телом)
app.use(express.json());

// Подключаем все маршруты из папки routes
app.use('/', routes);

// Обработка несуществующих маршрутов (404)
app.use((req, res) => {
    res.status(404).send('Route not found');
});

module.exports = app;
