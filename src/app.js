const express = require('express');
const path = require('path');
const routes = require('./routes');
const app = express();
const articleRoutes = require('./routes/articles'); // Проверьте наличие этого файла
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const SECRET_KEY = 'your_super_secret_key';

app.use('/articles', articleRoutes);

app.use(cookieParser());


app.set('views', path.join(__dirname, 'views'));


app.set('view engine', 'pug');


app.engine('ejs', require('ejs').renderFile);


app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use('/', routes);

module.exports = app;

