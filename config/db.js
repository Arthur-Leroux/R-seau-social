/*connexion a la base de données*/
const mongoose = require("mongoose");
/*on dit a mongoose de se connecter a la base de données mongoDB*/
const URL = process.env.MONGODB_URL
mongoose
  .connect(
    URL,
    {
    //   userNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    }
  )
  /*Pour nous nous dire qu'on a relier notre Back a notre base de données*/
  .then(() => console.log("Connected to MongoDB"))
  /*Si c'est pas le cas on Catch !*/
  .catch((err) => console.log("Failed to connect to MongoDB", err));
