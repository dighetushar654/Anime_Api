const { schema } = require("../models/animeModel");
const mongoose = require("mongoose");
const Anime = mongoose.model('anime', schema);
//create anime
exports.create_anime = async (req, res) => {
    const {name, trailerUrl, geners, sessionYear, currentRating, noOfEpisodesss} = req.body;
    try {
        let anime = new Anime({
            name,
            trailerUrl, 
            geners, 
            currentRating,
            sessionYear, 
            noOfEpisodesss
        });
        await anime.save();
        res.status(200).json(anime);
    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}

// get all animes 
exports.get_all = async (req, res) => {
    try {
        const animes = await Anime.find();
        // res.json(animes);
        const filters = req.query;
        const filteredCategory = animes.filter(category => {
            let isValid = true;
            for (key in filters) {
                // console.log(key, category[key], filters[key]);
                isValid = isValid && category[key] == filters[key];
            }
            return isValid;
        })
        res.send(filteredCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}

// update anime by id
exports.update_anime = async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}

//  delete anime by id
exports.delete_anime = async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}