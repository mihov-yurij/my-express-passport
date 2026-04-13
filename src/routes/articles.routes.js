const express = require('express');
const router = express.Router();
const controller = require('../controllers/articles.controller');
const validate = require('../middlewares/validateId');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/:articleId', validate('articleId'), controller.getById);
router.put('/:articleId', validate('articleId'), controller.update);
router.delete('/:articleId', validate('articleId'), controller.remove);

module.exports = router;