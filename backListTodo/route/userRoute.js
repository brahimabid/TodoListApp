const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const config=require('config');   
const User=require('../model/userModel')
const {validateUser,validateLogin}=require('../model/userModel')

const authmidlware=require('../midlware/authmidlware')
router.get('/currentUser',authmidlware,async (req,res)=>{
      
    console.log(req.user._id)
  
    const result=await User.findById(req.user._id).select("-password");
    console.log(result);
   return  res.send(result);
  
  
  })

var multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })

  var upload = multer({ storage: storage })
  router.post('/upload',upload.array('myFiles'),async(req,res)=>{
    const files = req.files
    let arr=[];
 files.forEach(element => {
    

  
      arr.push("http://localhost:4500/"+element.path)
 
   })
   console.log(arr)
  return res.send(arr)
})

router.post('/newUser',async(req,res)=>{
    const {error}=validateUser(req.body);
    if(error) return res.send({status:false,resultat:error.details[0].message});
      const isExist=await User.findOne({mail:req.body.mail});
    if(isExist) return res.send({status:false,resultat:'Email already exist'});

    var user=new User({
        name:req.body.name,
        mail:req.body.mail,
        password:req.body.password,
        img:req.body.img

    })
  
    const salt=await bcrypt.genSalt(10);

    user.password=await bcrypt.hash(user.password,salt);
    const result= await user.save();
    console.log(result);
    res.send({status:true,resultat:result})
})


router.post('/auth',async(req,res)=>{
    const {error}=validateLogin(req.body);
    if(error) return res.send({status:false , resultat:error.details[0].message});
    const isExist=await User.findOne({mail:req.body.mail});
    if(!isExist) return res.send({status:false,resultat:'Invalid Mail or password '});

    const validPassword=await bcrypt.compare(req.body.password,isExist.password);
    if(!validPassword) return res.send({status:false,resultat:'Invalid Mail or password '});
    const token =isExist.generateAuthToken();
    console.log(token);
    return res.header('x-token',token).send({status:true,resultat:token})
});
router.get('/',async(req,res)=>{
   
    const result=await User.find();
    if(!result || result.length==0){return res.send({status:false,resultat:'No Hotels Found..'})}

     return res.send({status:true,resultat:result});
    
})


module.exports=router;