const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

// Импорт роутов
const routes = require('./routes');
const articleRoutes = require('./routes/articles');

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.engine('ejs', require('ejs').renderFile);
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://trusted.cdn.com'],
        objectSrc: ["'none'"],

        upgradeInsecureRequests: true,
    }    
}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Для обработки форм
app.use(cookieParser());
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

function checkAuthentication(req, res, next) {
    const token = req.cookies ? req.cookies.token : null;
    
       if (token || req.isAuthenticated()) {
        return next();
    }
    res.status(401).send("Доступ заборонено. Увійдіть у систему.");
}
app.use('/articles', articleRoutes);
app.use('/', routes);

module.exports = app;


