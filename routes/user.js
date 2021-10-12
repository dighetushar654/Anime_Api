const router = require('express').Router();
const userController = require("../controllers/userController");
const auth = require("../middalwares/auth");

// User Routes and Reviews Routes
router
    .post("/signup", userController.create_user)
    .post("/login", userController.login_user)
    .get("/", userController.get_all)
    .get("/:id",userController.get_user)
    .put("/:id", userController.update_user)
    .delete("/:id", userController.delete_user)
    .post("/add_reviews/",auth, userController.add_review);

module.exports = router;