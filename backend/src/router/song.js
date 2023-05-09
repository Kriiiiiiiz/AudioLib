const express = require('express');
const router = express.Router();
const controller = require(`../controllers/song`);

router.get('/', controller.getAll);
router.get('/:id', controller.getInfo);

module.exports = router;