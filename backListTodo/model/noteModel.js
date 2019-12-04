var mongoose=require('mongoose');
var Joi=require('joi');

const shemaNote=mongoose.Schema({
    title:{type:String,required:true},
  body: {type:String,required:true},
  color: {type:String,required:true},
  favorite:{type:String,required:true},
  id:{type:String,required:true}
})

const Note=mongoose.model("Note",shemaNote);

function validateNote(note){
    shema={
        title:Joi.string().required(),
        body:Joi.string().required(),
        color:Joi.string().required(),
        favorite:Joi.required(),
       
    }
    return Joi.validate(note,shema);
}

module.exports=Note;
module.exports.validateNote=validateNote;
