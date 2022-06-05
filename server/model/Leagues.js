const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seasonSchema = new Schema({
    coverage: {
        injuries: Boolean,
        odds: Boolean,
        players: Boolean,
        predictions: Boolean,
        standings: Boolean,
        top_assists: Boolean,
        top_cards: Boolean,
        top_scorers: Boolean,
        fixtures: {
            events: Boolean,
            lineups: Boolean,
            statistics_fixtures: Boolean,
            statistics_players: Boolean,
        }
    },
    current: Boolean,
    year: Number,
    start: String,
    end: String,
});

const leaguesSchema = new Schema({
    league: {
        id: {
            type: Number,
            required: true,
        },
        name: String,
        type: { type: String }, // for type
        logo: String,
    },
    country: {
        name: String,
        code: {
            type: String,
            default: null,
        },
        flag: {
            type: String,
            default: null,
        },
    },
    seasons: [seasonSchema],
});

module.exports = mongoose.model('Leagues', leaguesSchema);
