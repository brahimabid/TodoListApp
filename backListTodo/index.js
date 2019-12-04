const mongoose=require('mongoose');
const express=require('express')
const app=express()
const bodyParser=require('body-parser');
let cors =require('cors');
app.use(express.json());
const routerUser=require('./route/userRoute')
const routerNote=require('./route/noteRoute')


mongoose.connect('mongodb://localhost/todoBase',{ useCreateIndex: true,useUnifiedTopology: true ,useNewUrlParser: true})
.then(()=>console.log('connect to mongofb...'))
.catch(err=>console.log('cannot connect to mongo  ',err))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/user',routerUser)
app.use('/note',routerNote)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uploads'));
app.use('/uploads', express.static(__dirname + '/uploads/'));

port=process.env.PORT ||4500;
app.listen(port,()=>console.log("listen on port"+port));
