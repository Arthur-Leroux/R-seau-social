/*connexion a la base de données*/
const mongoose = require("mongoose");
/*on dit a mongoose de se connecter a la base de données mongoDB*/
const DB_USER_PASS=process.env.DB_USER_PASS
mongoose
  .connect(
    "mongodb+srv://" + DB_USER_PASS + "@cluster0.ybrn2fj.mongodb.net/test",
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
