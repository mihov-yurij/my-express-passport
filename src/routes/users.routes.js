const express = require('express');
const router = express.Router(); // <--- Убедитесь, что эта строка есть!
const validate = require('../middlewares/validateId');
const controller = require('../controllers/users.controller'); 

// Маршруты
router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/:userId', validate('userId'), controller.getById);
router.put('/:userId', validate('userId'), controller.update);
router.delete('/:userId', validate('userId'), controller.remove);

// Экспорт (то самое имя, которое должно быть объявлено выше)
module.exports = router;

