const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    home: {
        type: Number,
        default: null,
    },
    away: {
        type: Number,
        default: null,
    },
});

const teamsSchema = new Schema({
    id: Number,
    name: String,
    logo: String,
    winner: {
        type: Boolean,
        default: null,
    }
});

// схема одного элемента в массиве
const fixtureSchema = new Schema({
    fixture: {
        id: Number,
        referee: {
            type: String,
            default: null,
        },
        timezone: String,
        date: String,
        timestamp: Number,
        periods: {
            first: {
                type: Number,
                default: null,
            },
            second: {
                type: Number,
                default: null,
            },
        },
        venue: {
            id: Number,
            name: String,
            city: String,
        },
        status: {
            long: String,
            short: String,
            elapsed: {
                type: Number,
                default: null,
            },
        },
    },
    league: {
        id: Number,
        name: String,
        country: String,
        logo: String,
        flag: String,
        season: Number,
        round: String,
    },
    teams: {
        home: teamsSchema,
        away: teamsSchema,
    },
    goals: scoreSchema,
    score: {
        halftime: scoreSchema,
        fulltime: scoreSchema,
        extratime: scoreSchema,
        penalty: scoreSchema,
    }
});

const fixturesSchema = new Schema({
    league: {
        type: Number,
        required: true,
    },
    season: {
        type: Number,
        required: true,
    },
    fixtures: [fixtureSchema],
});

module.exports = mongoose.model('Fixtures', fixturesSchema);