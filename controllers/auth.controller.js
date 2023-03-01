const UserModel =require ("../models/user.model");
const jwt = require('jsonwebtoken');
const cookieParser = require ("cookie-parser");
const { signUpErrors } = require("../utils/error.utils");






// fonction asynchrone qui appelle signUp

module.exports.signUp = async (req, res) => {
    console.log(req.body);
  //dans la requête envoyée il y a des informations
  //on destructure

  const { pseudo, email, password } = req.body
  // req
  try {
    const user = await UserModel.create({ pseudo, email, password })
    //res
    res.status(201).json({ user: user._id });
  } catch (err) {
    //const errors = signUpErrors(err);
    res.status(200).send({ err });
  }
};
//vie du token 
const maxAge = 3 * 24 * 60 * 60 * 1000  
//fonction création du token 

const createToken = (id) => {
  const TOKEN_SECRET = process.env.TOKEN_SECRET
  return jwt.sign({id}, TOKEN_SECRET, {
    expiresIn:  maxAge
  })

};
module.exports.signIn = async (req,res) => {
  const { email , password} = req.body
  try {
 const user = await UserModel.login(email,password);// on tcheck si les utilisateurs existe dans la DB
 const token = createToken(user._id);// on créer un token pour (user)
 //httpOnly pour la sécurité du token, consultable que sur notre serveur
 //en parametre le framework JWT, la création du token et la sécurité
 res.cookie('jwt', token, {httpOnly : true, maxAge : maxAge});
 res.status(200).json ({user : user._id + "login is successfully"}) // permet d'avertir

 
  }catch(err){
    res.status(200).json (err)
    console.log(err)
  }
};

module.exports.logout = async (req,res) => {
res.cookie('jwt', '', {maxAge : 1}); // on précise se qu'on veux faire avec le cookie
res.redirect('/'); // on redirige vers la pages que l'on veux 

 
};
