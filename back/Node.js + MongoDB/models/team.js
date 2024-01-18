const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamName: {
        type: String,
        required: true
    },
    founded:{
        type: Number,
    },
    logo:{
        type: String,
    },
    hall:{
        type: String
    },
    country:{
        type: String
    }
}, {timestamps: true});

const Team = new mongoose.model('Team', teamSchema);

module.exports = Team;