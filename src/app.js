const express = require('express');
const path = require('path');
const routes = require('./routes');
const app = express();

// Настройка путей к шаблонам
app.set('views', path.join(__dirname, 'views'));

// Настройка PUG (как основной движок)
app.set('view engine', 'pug');

// Настройка EJS (дополнительный движок)
app.engine('ejs', require('ejs').renderFile);

// Раздача статики для CSS (папка public в корне)
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use('/', routes);

module.exports = app;

