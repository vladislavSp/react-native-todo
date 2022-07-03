const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Схема поинтов
const testSchema = new Schema({
    leagueId: Number,
    name: String,
});

module.exports = mongoose.model('Test', testSchema);