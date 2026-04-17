const express = require('express');
const router = express.Router();
const controller = require('../controllers/articles.controller');
const validate = require('../middlewares/validateId');
const ensureAuthenticated = require('../utils/authMiddleware');

router.get('/', controller.getAll);
router.get('/:articleId', validate('articleId'), controller.getById);
router.post('/', ensureAuthenticated, controller.create);
router.put('/:articleId', ensureAuthenticated, validate('articleId'), controller.update);
router.delete('/:articleId', ensureAuthenticated, validate('articleId'), controller.remove);

module.exports = router;
