const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    username: String,
    role: {
        type: Number,
        default: 1007,
    },
});

module.exports = mongoose.model('User', testSchema);
