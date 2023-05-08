const express = require('express');
const router = express.Router();
const controller = require(`../controllers/user`);

router.get('/', controller.getAuth)

module.exports = router;