// départ du back
//commande de base framework
const express = require("express");
const userRoutes = require("./routes/user.routes");
const bodyParser = require('body-parser');
require("dotenv").config({ path: "./config/.env" });
/*On averti le server de la BD */
require("./config/db");
/*A chaque fois que app est appeler se sera le framework express  */
const app = express();
// !!! ne pas oublier d'appeler !!!
//permet de traiter la data qui va transiter d'un point A à un point B
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//routes
// route USER => user.routes.js

app.use("/api/user", userRoutes);

/*app écoute le port 5000 */
app.listen(process.env.PORT, () => {
  console.log(`listening on port, ${process.env.PORT}`);
});
