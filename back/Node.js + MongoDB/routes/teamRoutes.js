const express = require('express');
const teamController = require('../controllers/teamController');

const router = express.Router();

router.get('/all', teamController.getAllTeams);

router.get('/:id', teamController.getTeamById);

router.get('/search/:search', teamController.getTeamsBySearch);

router.post('/', teamController.addTeam);

router.put('/', teamController.updateTeam);

router.delete('/:id', teamController.deleteTeam);

module.exports = router;