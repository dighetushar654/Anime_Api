const { schema } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var User = mongoose.model('User', schema);
const Anime = require("../models/animeModel");
const Review = require("../models/reviewModel");
dotenv.config();                        // to use .env variables


//signup user
exports.create_user = async (req, res) => {
        const {Username, email, password, phone} = req.body;
    try {
        // if user already exist
        var user = await User.findOne({email});
        if(user) {
            return res.status(400).json({ msg: 'User already exists with provided email'});
        }
        // if new user
        user = new User({
            Username,
            email,
            password,
            phone
        })
        // password converting into hashed format
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(200).send("user created sucessfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}

//logIn user
exports.login_user = async (req, res) => {

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({msg: 'User not found with provided email'});
        } else {
            console.log("user found");
        }
        const checkpassword = await bcrypt.compare(password, user.password);
        if(!checkpassword) {
            res.status(400).json({msg: "Password invalid"});
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.SecretKey, {
            // expiresIn:360000
        },(err, token) => {
            if(err) throw err;
            res.json({token})
        })

    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}

// get user by Id
exports.get_user = async (req, res) => {
    try {
        // find user and show data but hide password
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}

// get all users 
exports.get_all = async (req, res) => {
    try {
        // find all users and show data but hide password
        const user = await User.find().select('-password');
        res.json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}

// update user by id
exports.update_user = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },{new:true});
        res.status(200).json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}

//  delete user by id
exports.delete_user = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted")
    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}

// add reviews to animes
exports.add_review = async (req, res) => {
    try {
        const {rating, anime_id, description} = req.body;
        const new_review = new Review({
            rating,
            anime_id,
            description,
            user_id: req.user.id
        });
        await new_review.save();
        res.status(200).json(new_review);


    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}