const { readData, writeData } = require('../utils/fileHelper');
const FILE_NAME = 'users.json';

exports.getAll = (req, res) => {
    const users = readData(FILE_NAME);
    res.render('user.pug', { users }); 
};

exports.getById = (req, res) => {
    const users = readData(FILE_NAME);
    const user = users.find(u => u.id === parseInt(req.params.userId));
    if (!user) return res.status(404).send('User not found');
    res.render('user.pug', { user }); 
};

exports.create = (req, res) => {
    const users = readData(FILE_NAME);
    const newUser = { id: Date.now(), ...req.body };
    users.push(newUser);
    writeData(FILE_NAME, users);
    res.status(201).json(newUser);
};

// ЦЬОГО МЕТОДУ У ВАС НЕ ВИСТАЧАЛО
exports.update = (req, res) => {
    const users = readData(FILE_NAME);
    const index = users.findIndex(u => u.id === parseInt(req.params.userId));
    if (index === -1) return res.status(404).send('Not found');
    users[index] = { ...users[index], ...req.body };
    writeData(FILE_NAME, users);
    res.json(users[index]);
};

// ЦЬОГО МЕТОДУ ТАКОЖ МОЖЕ НЕ ВИСТАЧАТИ
exports.remove = (req, res) => {
    const users = readData(FILE_NAME);
    const newUsers = users.filter(u => u.id !== parseInt(req.params.userId));
    writeData(FILE_NAME, newUsers);
    res.status(204).send();
};

