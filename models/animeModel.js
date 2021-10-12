const mongoose = require('mongoose');


const animeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required: true
    },
    trailerUrl: {
        type: String,
        trim:true,
    },
    geners: {
        type: String, 
        trim:true,
    },
    currentRating: {
        type:Number,
        min: 1,
        max: 5 
    },
    sessionYear:{
        type:String,
    },
    noOfEpisodes:{
        type:Number,
    }
},
{timestamps: true});

module.exports = mongoose.model('anime', animeSchema);