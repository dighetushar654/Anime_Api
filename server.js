const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require('morgan');
const cors = require("cors");
const animeRoute = require("./routes/anime");
const userRoute = require("./routes/user");

// App Config...
const app = express();                  // instanciating express() in app variable
dotenv.config();                        // to use .env variables
const Port = process.env.Port || 4000;

// Middlewares
app.use(express.json());
app.use(morgan("common"));
app.use(cors());

app.use("/animes", animeRoute);
app.use("/users", userRoute);
// DB Config
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then ( () => console.log("MongoDB Connected"))
.catch ( (err) => console.log(err)); 


//Default Route
app.get("/", (req, res) => {
    res.status(200).json("Hello From Anime Server");
});

//Port for listening
app.listen(Port, () => {
    console.log(`Server Running On Port ${Port}`);
})