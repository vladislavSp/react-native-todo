const express = require('express');
const router = express.Router();
const getTeamsBySeason = require('../../controllers/teamController');

router.route('/').get(getTeamsBySeason);

module.exports = router;
