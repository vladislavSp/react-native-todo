const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Схема поинтов
const pointSchema = new Schema({
    played: Number,
    win: Number,
    draw: Number,
    lose: Number,
    goals: {
        for: Number,
        against: Number,
    }
});

const standingSchema = new Schema({
    rank: Number,
    team: {
        id: Number,
        name: String,
        logo: String,
    },
    points: Number,
    goalsDiff: Number,
    group: String,
    form: String,
    status: String,
    description: String,
    all: pointSchema,
    home: pointSchema,
    away: pointSchema,
    update: String,
});

const standingsSchema = new Schema({
    league: {
        id: Number,
        name: String,
        country: String,
        logo: String,
        flag: String,
        season: Number,
        standings: [[standingSchema]],
    }
});

module.exports = mongoose.model('Standings', standingsSchema);
