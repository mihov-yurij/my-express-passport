const { readData, writeData } = require('../utils/fileHelper');
const FILE_NAME = 'articles.json';

// 1. Отримати всі статті (EJS)
exports.getAll = (req, res) => {
    const articles = readData(FILE_NAME);
    res.render('articles.ejs', { articles });
};

// 2. Отримати статтю за ID (EJS)
exports.getById = (req, res) => {
    const articles = readData(FILE_NAME);
    const article = articles.find(a => a.id === parseInt(req.params.articleId));
    if (!article) return res.status(404).send('Статтю не знайдено');
    res.render('article-details.ejs', { article });
};

// 3. Створити статтю (Потрібно для роута router.post)
exports.create = (req, res) => {
    const articles = readData(FILE_NAME);
    const newArticle = { 
        id: Date.now(), 
        ...req.body,
        date: new Date().toISOString() 
    };
    articles.push(newArticle);
    writeData(FILE_NAME, articles);
    res.status(201).json(newArticle);
};

// 4. Оновити статтю (Потрібно для роута router.put)
exports.update = (req, res) => {
    let articles = readData(FILE_NAME);
    const index = articles.findIndex(a => a.id === parseInt(req.params.articleId));
    if (index === -1) return res.status(404).send('Not found');
    
    articles[index] = { ...articles[index], ...req.body };
    writeData(FILE_NAME, articles);
    res.json(articles[index]);
};

// 5. Видалити статтю (Потрібно для роута router.delete)
exports.remove = (req, res) => {
    const articles = readData(FILE_NAME);
    const newArticles = articles.filter(a => a.id !== parseInt(req.params.articleId));
    writeData(FILE_NAME, newArticles);
    res.status(204).send();
};


