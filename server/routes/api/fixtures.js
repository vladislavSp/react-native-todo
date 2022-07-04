const express = require('express');
const router = express.Router();

const getFixtures = require('../../controllers/fixturesController');
// const verifyJWT = require('../../middleware/verifyJWT');

router.route('/').get(getFixtures);

module.exports = router;
