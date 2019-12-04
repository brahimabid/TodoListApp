var mongoose=require('mongoose');
var Joi=require('joi');
const jwt=require('jsonwebtoken')
const config=require('config'); 
var ShemaUser=mongoose.Schema({
    name:{type:String },
    mail:{type:String,maxlength:30,unique:true},
    password:{type:String},
    img:[String]

});

ShemaUser.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id,name:this.name,img:this.img},config.get('jwtPrivateKey'));
    return token ; 
}

const User =mongoose.model('User',ShemaUser);

function validateUser(user){
    shema={
        name:Joi.string().required(),
        mail:Joi.string().email().max(30).required(),
        password:Joi.string().required(),
        img:Joi.required()
    }
    return Joi.validate(user,shema);
}
function validateLogin(user){
    shema={
        
        mail:Joi.string().email().max(30).required(),
        password:Joi.string().required(),
        
    }
    return Joi.validate(user,shema);

}


module.exports=User;
module.exports.validateUser=validateUser;
module.exports.validateLogin=validateLogin;