const express = require('express');
const router = express.Router();
const usersRoutes = require('./users.routes');
const articlesRoutes = require('./articles.routes');
const passport = require('passport');

// 1. Главная страница (чтобы не было 404 при заходе на localhost:3000)
router.get('/', (req, res) => {
    res.render('articles'); // или любая другая главная страница
});

// 2. Страница логина (нужна для отображения формы и для failureRedirect)
router.get('/login', (req, res) => {
    res.render('login'); // Убедитесь, что файл views/login.ejs существует
});

router.use('/users', usersRoutes);
router.use('/articles', articlesRoutes);

// Обработка отправки формы логина
router.post('/login', passport.authenticate('local', {
    successRedirect: '/articles', 
    failureRedirect: '/login',    
    failureFlash: true           
}));

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

module.exports = router;


