const UserModel = require("../models/user.model");
// permet de verifié l'ID par la base donnée
const ObjectID = require("mongoose").Types.ObjectId;
//plusieurs utilisateurs
module.exports.getAllUsers = async (req, res) => {
  //req.body récupere l'info de l'utilisateur
  console.log(req.body);
  // on va chercher la table UserModel tu find et tu prend tout
  // dans select  on lui stipule les élements que l'ont ne veux pas
  //en ajoutant un moins "-" devant !
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};
// un user
module.exports.userInfo = (req, res) => {
  // req.params récupere les infos de l'URL
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    // SI jamais l'id n'est pas connu connu tu retourne
    return res.status(400).send("ID unknow : " + req.params.id);

  UserModel.findById(req.params.id, (err, data) => {
    //Si jamais pas d'erreur remonter en data sans mot de passe .sel...
    if (!err) res.send(data);
    else console.log("ID unknow : " + err);
  }).select("-password");
};
// update user on prend l'id si il est corret on récupére les parametres de id
module.exports.udpateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    // SI  l'id n'est pas connu ! tu retourne !
    return res.status(400).send("ID unknow : " + req.params.id);
  // on récupere les parametres de l'id dans le try
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          // on veux pouvoir changer la bio de l' id
          bio: req.body.bio,
        }
      },
      //paramétre obligatoire avec une route PUT
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, data) => {
        if (!err) return res.send(data);
        if (err) return res.status(500).send({ message: err });
      }
    )
  } catch (err) {
    //res.status(500).json({message :err})
  }
};

//DELETE 
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    // SI  l'id est connu ! tu retourne !
    return res.status(400).send("ID unknow : " + req.params.id);

  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    return res.status(200).json({ "Delete completed for :": req.params.id });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

};



module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).jsos(err);
      }
    );
    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
    // remove to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};


