const express = require('express');
const router = express.Router();

const playerController = require('../controllers/playerController');

router.post('/', playerController.addPlayer);

router.get('/search/:search', playerController.getPlayersBySearch);

router.get('/:id', playerController.getPlayerById);

router.delete('/:id', playerController.deletePlayer);

router.put('/', playerController.updatePlayer);


module.exports = router;