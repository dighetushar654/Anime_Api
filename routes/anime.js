const router = require('express').Router();
const animeController = require("../controllers/animeController");
const auth = require("../middalwares/auth");

router
    .post("/", animeController.create_anime)
    .get("/", auth, animeController.get_all)
    .put("/:id", animeController.update_anime)
    .delete("/:id", animeController.delete_anime);

module.exports = router;