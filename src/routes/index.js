const express = require('express');
const router = express.Router();

const usersRoutes = require('./users.routes');
const articlesRoutes = require('./articles.routes');

// Проверьте, чтобы эти переменные (usersRoutes, articlesRoutes) были функциями/роутерами
router.use('/users', usersRoutes);
router.use('/articles', articlesRoutes);

module.exports = router;

