/* départ du back */ 
/*commande de base framework   */
const express = require('express');
require('dotenv').config({path:'./config/.env'})
/*On averti le server de la BD */
require('./config/db')
/*A chaque fois que app est appeler se sera le framework express  */
const app = express();
/*app écoute le port 5000 */
app.listen(process.env.PORT, ()=>{
    console.log(`listening on port, ${process.env.PORT}`);
})
