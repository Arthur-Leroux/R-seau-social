// router express
const router = require("express").Router();
const authController = require("../controllers/auth.controller");
//méthod post pour un nouvel utilisateur fonction qui sera dans le authController
router.post("/register", authController.signUp);

module.exports = router;
