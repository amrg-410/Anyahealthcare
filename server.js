const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.urlencoded({extended:true}));   


mongoose.connect('mongodb+srv://amrg_5612:Mongo_5612@botathon.8ytyjss.mongodb.net/Healthcare?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true})
.then((res)=>{
    app.listen(4000,()=>{
        console.log('Anya Bot')
})
console.log('Success')})
.catch((err)=>{console.log(err)})

//route  to login  
const login=require('./controller/login')
app.use(login)

app.get('/',(req,res)=>{
    res.send("YES")
})
