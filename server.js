const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser'); 
const jwt = require('jsonwebtoken');           
const routes = require('./src/routes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_super_secret_key'; 

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.currentTheme = req.cookies.userTheme || 'light';
    const token = req.cookies.token;
    res.locals.user = null;
    
    if (token) {
        try {
            res.locals.user = jwt.verify(token, SECRET_KEY);
        } catch (err) { 
            res.clearCookie('token');
        }
    }  
    next();
});

const requireAuth = (req, res, next) => {
    if (!res.locals.user) {
        return res.status(401).send("Доступ заборонено. Увійдіть у систему.");
    }
    next();
};

app.get('/', (req, res) => {    
    res.render('articles', { theme: res.locals.currentTheme }); 
});

app.get('/change-theme/:newTheme', (req, res) => {
    const theme = req.params.newTheme; 
    res.cookie('userTheme', theme, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    const backURL = req.header('Referer') || '/';
    if (backURL.includes('/change-theme/')) {
        res.redirect('/');
    } else {
        res.redirect(backURL);
    }
});

app.post('/login', (req, res) => {
    const { username } = req.body;
    const token = jwt.sign({ name: username }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

app.use('/api', requireAuth, routes);

app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error); 
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});








