const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthdate:{
        type: Date,
        required: true
    },
    height:{
        type: Number
    },
    weight:{
        type: Number
    },
    spike:{
        type: Number
    },
    block:{
        type: Number
    },
    dominantHand:{
        type: String
    },
    nationality: {
        type: String,
        required: true
    },
    photo:{
        type: String
    },
    team:{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }
}, {timestamps: true});
playerSchema.index({ firstname: 'text', lastname: 'text' });


const Player = new mongoose.model('Player', playerSchema);

module.exports = Player;