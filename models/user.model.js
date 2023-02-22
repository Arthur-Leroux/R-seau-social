const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require ('bcrypt');
// objet de la bibliothéque mongoose "Schema"
const userShema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    minLenght: 3,
    maxlength: 55,
    unique: true,
    trim: true,  // <= permet de supprimer les espaces à la fin du pseudo
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    max: 1024,
    minLenght: 6,
  },
  picture: {
    type :String,
    default : "./uploads/profils/random-user.png"
  },
  bio: {
    type: String,
    max: true,
  },
  followers: {
    type: [String],
  },
  following: {
    type : [String]
  },
  likes : {
    type : [String]
  }

},
{
  timestamps : true,
}
);

// play function before save into display : 'block',
userShema.pre('save', async function(next){
  // on salt le MDP 
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userShema.statics.login =  async function(email, password) {
const user = await this.findOne({email});

if(user){
const auth = bcrypt.compare(password, user.password);
 if (auth){
  return (user)
}
  throw Error ('incorrect password');
}
  throw Error ('incorrect email');
}


const UserModel = mongoose.model('user', userShema);
// on oublie pas d'exporter 

module.exports = UserModel;
