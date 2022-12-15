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


//route to appointment
const appointment=require('./controller/appointment')
app.use(appointment)


//route to reschedule
const reschedule=require('./controller/reschedule')
app.use(reschedule)


//route to cancel
const cancel=require('./controller/cancel')
app.use(cancel)


//route to vicinity
const vicinity=require('./controller/vicinity')
app.use(vicinity)


//route to insurance
const insurance=require('./controller/insurance')
app.use(insurance)


//route to updateProfile
const updateProfile=require('./controller/updateProfile')
app.use(updateProfile)



//route to card
const card=require('./controller/card')
app.use(card)


//route to changePolicy
const changePolicy=require('./controller/changePolicy')
app.use(changePolicy)


//route to viewClaim
const viewClaim=require('./controller/viewClaim')
app.use(viewClaim)


app.get('/',(req,res)=>{
    res.send("YES")
})