const express=require('express');
const router=express.Router();
const authmidlware=require('../midlware/authmidlware');
const Note=require('../model/noteModel');
const {validateNote}=require('../model/noteModel')
router.post('/newNote',authmidlware, async(req,res)=>{
    const {error}=validateNote(req.body);
    if(error) return res.send({status:false,resultat:error.details[0].message});
     
    var note=new Note({
        title:req.body.title,
        body:req.body.body,
        color:req.body.color,
        favorite:req.body.favorite,
        id:req.user._id
    })
  
    
    const result= await note.save();
   
    res.send({status:true,resultat:result})
})
router.get('/',authmidlware, async(req,res)=>{
   
    const result=await Note.find({id:req.user._id});
    if(!result || result.length==0){return res.send({status:false,resultat:'Aucune Note ...'})}

     return res.send({status:true,resultat:result});
    
})
router.put('/update/:id',authmidlware,async(req,res)=>{
    const {error}=validateNote(req.body);
    if(error) return res.send({status:false,resultat:error.details[0].message});
     
 
     let result=await Note.findByIdAndUpdate({_id:req.params.id},
         {$set:
            {
                title:req.body.title,
                body:req.body.body,
                color:req.body.color,
                favorite:req.body.favorite
    
            }
        }
        ,{new:true})  ;
     
      
  
     console.log(result);
     res.send({status:true,resultat:result});
 })

module.exports=router;