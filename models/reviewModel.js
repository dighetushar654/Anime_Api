const mongoose = require('mongoose');
const validator = require('validator');

const reviewSchema = new mongoose.Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    anime_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"animes"
    },
    rating: {
        type:Number,
        min: 1,
        max: 5 
    },
    description: {
        type: String,
        trim:true
    }
},
{timestamps: true});

module.exports = mongoose.model('Review', reviewSchema);