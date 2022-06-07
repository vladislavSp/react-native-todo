const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
});

const seasonTeamsSchema = new Schema({
    leagueId: Number,
    season: Number,
    teams: [teamSchema],
});

module.exports = mongoose.model('SeasonTeams', seasonTeamsSchema);
