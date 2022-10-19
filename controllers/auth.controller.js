const UserModel =require ("../models/user.model");
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
    res.status(200).send({ err });
  }
};
