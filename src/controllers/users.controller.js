const { readData, writeData } = require('../utils/fileHelper');
const FILE_NAME = 'users.json';

exports.getAll = (req, res, next) => {
    try {
        const users = readData(FILE_NAME);
        res.json(users);
    } catch (err) {
        next(err);
    }
};

exports.create = (req, res, next) => {
    try {
        const users = readData(FILE_NAME);
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        const newUser = { id: newId, ...req.body };
        users.push(newUser);
        writeData(FILE_NAME, users);
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
};

exports.getById = (req, res, next) => {
    try {
        const users = readData(FILE_NAME);
        const user = users.find(u => u.id === parseInt(req.params.userId));
        if (!user) return res.status(404).send("User not found");
        res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.update = (req, res, next) => {
    try {
        const users = readData(FILE_NAME);
        const index = users.findIndex(u => u.id === parseInt(req.params.userId));
        if (index === -1) return res.status(404).send("User not found");
        users[index] = { id: parseInt(req.params.userId), ...req.body };
        writeData(FILE_NAME, users);
        res.json(users[index]);
    } catch (err) {
        next(err);
    }
};

exports.remove = (req, res, next) => {
    try {
        let users = readData(FILE_NAME);
        users = users.filter(u => u.id !== parseInt(req.params.userId));
        writeData(FILE_NAME, users);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
