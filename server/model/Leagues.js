const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    team: {
        id: Number,
        name: String,
        code: String,
        country: String,
        founded: Number,
        national: Boolean,
        logo: String,
    },
    venue: {
        id: Number,
        name: String,
        address: String,
        city: String,
        capacity: Number,
        surface: String,
        image: String,
    },
});

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
    teams: [TeamSchema],
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
