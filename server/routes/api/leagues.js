const express = require('express');
const router = express.Router();
const {
    getAllLeagues,
    createNewLeague,
    updateLeague,
    deleteLeague,
} = require('../../controllers/leagueController');
// const verifyJWT = require('../../middleware/verifyJWT');

router.route('/')
    // .get(verifyJWT, getAllLeagues) // verifyJWT = проверяет токен в роуте (только зарег пользователю)
    .get(getAllLeagues)
    .post(createNewLeague)
    .put(updateLeague)
    .delete(deleteLeague);

module.exports = router;
