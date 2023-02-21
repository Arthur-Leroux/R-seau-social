// router express
const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const UserModel = require("../models/user.model");
//auth
//méthod post pour un nouvel utilisateur fonction qui sera dans le authController
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get ("/logout", authController.logout);
//méthod GET pour tout les users
router.get("/", userController.getAllUsers);
router.get(`/:id`, userController.userInfo);
//method PUT pour faire des update avec l'id 
router.put("/:id", userController.udpateUser);
//method DELETE pour supprimer
router.delete("/:id", userController.deleteUser);
//method PATCH pour mettre a jour le tableau 
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);
module.exports = router;
