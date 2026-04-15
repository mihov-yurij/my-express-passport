const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; 

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).redirect('/login'); 
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Данные пользователя доступны в req.user
        res.locals.user = decoded; // Данные доступны во всех шаблонах (Pug/EJS)
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

module.exports = verifyToken;
