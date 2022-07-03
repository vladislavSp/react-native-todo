const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fixtureRoundsSchema = new Schema({
    league: {
        type: Number,
        required: true,
    },
    season: {
        type: Number,
        required: true,
    },
    rounds: [String],
});

module.exports = mongoose.model('FixtureRounds', fixtureRoundsSchema);
