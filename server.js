// départ du back
//commande de base framework et librairie
const express = require("express");
const userRoutes = require("./routes/user.routes");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
require("dotenv").config({ path: "./config/.env" });
/*On averti le server de la BD */
require("./config/db");
const {checkUser} = require('./middleware/auth.middleware ')
/*A chaque fois que app est appeler se sera le framework express  */
const app = express();
// !!! ne pas oublier d'appeler !!!
//permet de traiter la data qui va transiter d'un point A à un point B
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//on appelle cookieParser depuis la base de notre application
app.use(cookieParser());
//'*' toutes les routes 
//tu check si l'utilisateur est connecté
app.get('*', checkUser)
// route USER => user.routes.js

app.use("/api/user", userRoutes);

/*app écoute le port 5000 */
app.listen(process.env.PORT, () => {
  console.log(`listening on port, ${process.env.PORT}`);
});
