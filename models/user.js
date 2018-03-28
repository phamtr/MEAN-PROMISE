const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
    if(!email){
        return false;
    } else {
        if(email.length < 5 || email.length > 30){
            return false;
        }else{
            return true;
        }
    }
};
let validEmailChecker = (email) => {
    if(!email) {
      return false;
    }else{
  const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regExp.test(email);
    }
  };
  
const emailValidators = [{
    validator: emailLengthChecker, message: "Email is about 5-30 characters"
},
{ validator: validEmailChecker,
    message: 'Must be a valid e-mail'}
  
];

let usernameLenthChecker = (username) => {
    if(!username){
      return false;
    }else{
      if(username.length<3 || username.length>15 ){
        return false;
      }else{
        return true;
      }
    }
  };
  let validUsername = (username) => {
    if (!username){
      return false;
    } else {
      const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
      return regExp.test(username);
    }
  };
  
  const usernameValidators = [
    {
      validator: usernameLenthChecker,
      message: 'User must be at least 3 characters but no more than 30'
    },
    {
      validator: validUsername,
      message: 'Must be a valid name'
    }
  ];
  
  let passwordLengthChecker = (password) => {
    if(!password){
      return false;
    }else{
      if(password.length < 8 || password.length > 35){
        return false;
      } else{
        return true;
      }
    }
  };
  
  let validPassword = (password) => {
    if(!password){
      return false;
    }else{
      const regExp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[\W]).{8,35}$/);
      return regExp.test(password);
    }
  };
  
  const passwordValidators = [{
    validator: passwordLengthChecker,
    message: 'Password must be 8-35 characters'
  },
  {
    validator: validPassword,
    message: 'Must be at least one upper, lower, special character, and number'
  }
  ];
  
  

const userSchema = new mongoose.Schema({
email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
password: { type: String, required: true, validate: passwordValidators },
address: { type: String},
telephone: { type: String},
companyname: { type: String},
admin: {type: Boolean},
active: {type: Boolean},
createdAt: { type: Date, default: Date.now() }
});

userSchema.pre('save', function(next){
    if (!this.isModified('password'))
    return next();
var user = this;
    bcrypt.hash(user.password, null, null, (err, hash) =>{
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(candidatePassword){
  let password = this.password;
  return new Promise((resolve, reject) =>{
bcrypt.compare(candidatePassword, password, (err, success) =>{
  if(err) {
    return reject(err);
  } else{
    return resolve(success);
  }
  
});
  });
   
};

module.exports = mongoose.model('User', userSchema);