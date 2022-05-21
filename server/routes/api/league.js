// 
const express = require('express');
const router = express.Router();
const {
    getAllLeagues,
    createNewLeague, updateLeague, deleteLeague,
    getLeague,
} = require('../../controllers/leagueController');

router.route('/')
    .get(getAllLeagues)
    .post(createNewLeague)
    .put(updateLeague)
    .delete(deleteLeague);

router.route('/:id').get(getLeague);

module.exports = router;
