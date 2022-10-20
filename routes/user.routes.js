// router express
const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const UserModel = require("../models/user.model");
//méthod post pour un nouvel utilisateur fonction qui sera dans le authController
router.post("/register", authController.signUp);
//méthod GET pour tout les users
router.get("/", userController.getAllUsers);
router.get(`/:id`, userController.userInfo);
//method PUT pour faire des update avec l'id 
router.put("/:id", userController.udpateUser);

module.exports = router;
