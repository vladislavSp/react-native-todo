const express = require('express');
const router = express.Router();
const { getStanding } = require('../../controllers/leagueController');
// const verifyJWT = require('../../middleware/verifyJWT');

// .get(verifyJWT, getAllLeagues) // verifyJWT = проверяет токен в роуте (только зарег пользователю)
router.route('/').get(getStanding);

module.exports = router;
