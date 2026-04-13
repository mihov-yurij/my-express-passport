const { readData, writeData } = require('../utils/fileHelper');
const FILE_NAME = 'articles.json';

// Получить все статьи (с поддержкой поиска по названию)
exports.getAll = (req, res, next) => {
    try {
        const articles = readData(FILE_NAME);
        const { title } = req.query;

        if (title) {
            const filtered = articles.filter(a => 
                a.title.toLowerCase().includes(title.toLowerCase())
            );
            return res.send(`Filtered articles: ${JSON.stringify(filtered, null, 2)}`);
        }

        res.send(`Articles list: ${JSON.stringify(articles, null, 2)}`);
    } catch (err) {
        next(err);
    }
};

// Создать статью
exports.create = (req, res, next) => {
    try {
        const articles = readData(FILE_NAME);
        // Генерация ID: ищем максимальный и прибавляем 1
        const newId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
        
        const newArticle = { id: newId, ...req.body };
        articles.push(newArticle);
        
        writeData(FILE_NAME, articles);
        res.status(201).send(`Article added with ID: ${newId}`);
    } catch (err) {
        next(err);
    }
};

// Получить по ID
exports.getById = (req, res, next) => {
    try {
        const articles = readData(FILE_NAME);
        const article = articles.find(a => a.id === parseInt(req.params.articleId));

        if (!article) {
            const error = new Error("Article not found");
            error.status = 404;
            return next(error);
        }

        res.send(JSON.stringify(article, null, 2));
    } catch (err) {
        next(err);
    }
};

// Обновить статью
exports.update = (req, res, next) => {
    try {
        const articles = readData(FILE_NAME);
        const index = articles.findIndex(a => a.id === parseInt(req.params.articleId));

        if (index === -1) {
            const error = new Error("Article not found");
            error.status = 404;
            return next(error);
        }

        // Обновляем данные, сохраняя ID
        articles[index] = { id: parseInt(req.params.articleId), ...req.body };
        
        writeData(FILE_NAME, articles);
        res.send(`Article ${req.params.articleId} updated successfully.`);
    } catch (err) {
        next(err);
    }
};

// Удалить статью
exports.remove = (req, res, next) => {
    try {
        let articles = readData(FILE_NAME);
        const initialLength = articles.length;
        
        articles = articles.filter(a => a.id !== parseInt(req.params.articleId));

        if (articles.length === initialLength) {
            const error = new Error("Article not found");
            error.status = 404;
            return next(error);
        }

        writeData(FILE_NAME, articles);
        res.send(`Article ${req.params.articleId} deleted.`);
    } catch (err) {
        next(err);
    }
};
