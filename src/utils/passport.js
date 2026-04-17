const LocalStrategy = require('passport-local').Strategy;
const fileHelper = require('./fileHelper'); 

module.exports = function(passport) {    
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        try {
            const users = fileHelper.readData('users.json') || [];    
            const user = users.find(u => u.email === email);
            if (!user) {
                return done(null, false, { message: 'Пользователь не найден' });
            }
            if (password === user.password) { 
                return done(null, user);
            } else {
                return done(null, false, { message: 'Неверный пароль' });
            }
        } catch (err) {
            return done(err);
        }
    }));
    passport.serializeUser((user, done) => {
        done(null, user.email);
    });
    passport.deserializeUser((email, done) => {
        try {
            const users = fileHelper.readData('users.json') || [];
            const user = users.find(u => u.email === email);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};

