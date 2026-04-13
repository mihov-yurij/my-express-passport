const express = require('express');
const router = express.Router();
const usersRoutes = require('./users.routes');
const articlesRoutes = require('./articles.routes');

router.get('/', (req, res) => res.send("Get root route"));
router.use('/users', usersRoutes);
router.use('/articles', articlesRoutes);

module.exports = router;
