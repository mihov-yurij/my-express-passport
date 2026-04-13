const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validateId');
// Оставляем только один импорт контроллера
const controller = require('../controllers/users.controller'); 

router.get('/', controller.getAll);
router.post('/', controller.create); // Исправлено: добавлена точка
router.get('/:userId', validate('userId'), controller.getById);
router.put('/:userId', validate('userId'), controller.update);
router.delete('/:userId', validate('userId'), controller.remove);

module.exports = router;

