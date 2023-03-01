//Premiere erreur sur la fonction "signUp"
const UserModel =require('../models/user.model');



module.exports.signUpErrors = (err) => {

    const errors = {pseudo: "", email : "" , password :""}
    //erreur pseudo
    if(err.message.includes('pseudo'))
    errors.pseudo = "Pseudo incorrect ou déjà pris";
    //erreur email
    if(err.message.includes('email'))
    errors.email ="Email Inconnu ou déjà pris";
    //erreur password
    if(err.message.includes("password"))
    errors.password ="mot de passe incorrect";
    //erreur 1100 pour les emails déjà enregistré en base de données
    if(err.code===1100 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà enregistré";

    // on retourne l'erreur à la fonction "SignUp"
    return errors;
};
// ensuite pour la signIn 

module.exports.signInErrors = (err) => {
    let errors = {email: "", password: ""};
// erreur email
    if (err.message.includes('email')) {
        errors.email = "Email inconnu";
    }
//erreur passaword
    if (err.message.includes("password")) {
        errors.password = "Mot de passe incorrect";
    }

    return errors;
};

