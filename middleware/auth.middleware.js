const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');





/*fonction pour tester si l'utilisateur reste connecté tout au long
de sa navigation*/
//le "next" pour dire au middleware de poursuivre le code  
module.exports.checkUser = (req,res, next) => {
    /*comme pour lire "body" il faut une librairie appeler 
    cookie-parser*/
const token = req.cookies.jwt;
//on verifie le token avec le 'TOKEN_SECRET'
if(token){
    jwt.verify(token,process.env.TOKEN_SECRET, async(err,decodedToken) =>{
        if(err){
            res.locals.user =null;
            res.cookie('jwt', '',{ maxAge : 1});
            //on continue d'executer le code
            next();
        }else{
            console.log('decodedToken' + decodedToken)
            let user = await UserModel.findById(decodedToken.id);
            res.locals.user = user;
            console.log(res.locals.user);
            next();

        }
    });
} else {
    res.locals.user = null;
    next();
}
};
//middleware pour la premiere authentification 
module.exports.requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodedToken) => {
            if (err){
                console.log(err);
                //pas de next car si erreur on ne continue pas le code 
            }else {
                console.log(decodedToken.id);
                next();
            }

        })
    }else {
        console.log('no token'); 
    }


};