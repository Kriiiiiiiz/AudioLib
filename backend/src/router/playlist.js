const express = require('express');
const router = express.Router();
const controller = require(`../controllers/playlist`);

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/:id', controller.getInfo);
router.post('/:id/:song', controller.addSong);
router.delete('/:id/:song', controller.deleteSong);
router.delete('/:id', controller.delete);
router.get('/:id/share', controller.share);

module.exports = router;