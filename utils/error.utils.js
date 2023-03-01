//Premiere erreur sur la fonction "signUp"

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
    errors.password ="Le mot de passe doit faire 6 caractères minimum";
    //erreur 1100 pour les emails déjà enregistré en base de données
    if(err.code===1100 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà enregistré";
    //si le le pseudo est déjà prit 
    if(err.code===1100 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Ce pseudo est déjà enregistré";


    // on retourne l'erreur à la fonction "SignUp"
    return errors;
};

