const route = require('express').Router()
const user = require('../model/appt')
const doctor = require('../model/doctor')
const slots = require('../model/slots')
// const nodemailer=require("nodemailer")  
// const handlebars = require("handlebars")
// const fs = require("fs")
// const path = require("path")
// const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/templateApt.hbs"), "utf8") 

// let transporter = {
//     service: 'gmail',
//     auth: {
//     user: 'anyahealthcarebot@gmail.com' ,
//     pass: 'deaq bxzg yfev pgdd',
//     },
// };

// const smtpTransport = nodemailer.createTransport(transporter)
// const template = handlebars.compile(emailTemplateSource)

route.post('/verifyDoctor',(req,res)=>{
    console.log(req.body)
        doctor.findOne({providerZipcode:req.body.zipCode,providerSpeciality:req.body.speciality})
        .then((result)=>{
            console.log(result)
            if(result === null)
            {
                res.sendStatus(404)
            }
            else{
                res.send(result)
                // res.sendStatus(200)
            }   
        })
        .catch(err=>{
           console.log(err)
        })
})


route.post('/checkSlots',(req,res)=>{
    console.log(req.body)
        slots.find({providerId:req.body.providerId,date:req.body.scheduleDate})
        .then((result)=>{
            console.log(result)
            if(result === null)
            {
                res.sendStatus(404)
            }
            else{
                if(result.time.slice(0,2) === req.body.scheduleTime.toString().slice(1,3) && result.bookedStatus === false)
                {
                    console.log(result)
                    res.send(result)
                    return res.sendStatus(200)
                } 
            }   
        })
        .catch(err=>{
           console.log(err)
        })
})

route.post('/updateSlots',(req,res)=>{
    console.log(req.body)
        slots.find({providerId:req.body.providerId,date:req.body.scheduleDate})
        .then((result)=>{
            console.log(result)
            if(result === null)
            {
                res.sendStatus(404)
            }
            else{
                if(result.time.slice(0,2) === req.body.scheduleTime.toString().slice(1,3) && result.bookedStatus === false)
                {
                    result.bookedStatus = true
                    result.save()
                    return res.sendStatus(200)
                }  
            }   
        })
        .catch(err=>{
           console.log(err)
        })
})


app.post('/insert',(req,res)=>{
    console.log(req.body)
    user.create(req.body)
    res.send('user created')
})


module.exports=route