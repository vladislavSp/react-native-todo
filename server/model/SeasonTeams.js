const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultHomeAwaySchema = new Schema({
    home: Number,
    away: Number,
    total: Number,
});

const minutesSchema = new Schema({
    total: Number,
    percentage: String,
});

const allMinutesSchema = new Schema({
    '0-15': minutesSchema,
    '16-30': minutesSchema,
    '31-45': minutesSchema,
    '46-60': minutesSchema,
    '61-75': minutesSchema,
    '76-90': minutesSchema,
    '91-105': minutesSchema,
    '106-120': minutesSchema,
});

const goalsSchema = new Schema({
    total: defaultHomeAwaySchema,
    average: defaultHomeAwaySchema,
    minute: allMinutesSchema,
});

const teamSchema = new Schema({
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
    statistics: {
        league: {
            id: Number,
            name: String,
            country: String,
            logo: String,
            flag: String,
            season: Number,
        },
        team: {
            id: Number,
            name: String,
            logo: String,
        },
        form: String,
        fixtures: {
            played: defaultHomeAwaySchema,
            wins: defaultHomeAwaySchema,
            draws: defaultHomeAwaySchema,
            loses: defaultHomeAwaySchema,
        },
        goals: {
            for: goalsSchema,
            against: goalsSchema,
        },
        biggest: {
            streak: {
                wins: Number,
                drawns: Number,
                loses: Number,
            },
            wins: {
                home: String,
                away: String,
            },
            loses: {
                home: String,
                away: String,
            },
            goals: {
                for: {
                    home: Number,
                    away: Number,
                },
                against: {
                    home: Number,
                    away: Number,
                },
            },
        },
        'clean_sheet': defaultHomeAwaySchema,
        'failed_to_score': defaultHomeAwaySchema,
        penalty: {
            scored: minutesSchema,
            missed: minutesSchema,
            total: Number,
        },
        lineups: [{ formation: String, played: Number }],
        cards: {
            yellow: allMinutesSchema,
            red: allMinutesSchema,
        },
    }
});

const seasonTeamsSchema = new Schema({
    leagueId: Number,
    season: Number,
    teams: [teamSchema],
});

module.exports = mongoose.model('SeasonTeams', seasonTeamsSchema);
