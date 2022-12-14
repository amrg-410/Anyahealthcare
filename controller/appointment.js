const route = require('express').Router()
const user = require('../model/appt')
const doctor = require('../model/doctor')
const slots = require('../model/slots')
const nodemailer=require("nodemailer")  
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/tempApt.hbs"), "utf8") 

let transporter = {
    service: 'gmail',
    auth: {
    user: 'anyahealthcarebot@gmail.com' ,
    pass: 'deaq bxzg yfev pgdd',
    }
};

const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)

route.post('/verifyDoctor',(req,res)=>{
    console.log(req.body)
        doctor.findOne({providerZipcode:req.body.zipCode,providerSpeciality:req.body.speciality})
        .then((result)=>{
            console.log(result)
            if(result === null){
                res.sendStatus(404)
            }
            else{
                res.send(result)
                return res.sendStatus(200)
            }   
        })
        .catch(err=>{
           console.log(err)
        })
})


route.post('/checkSlots',(req,res)=>{
    console.log(req.body)
        slots.findOne({providerId:req.body.providerId,date:req.body.scheduleDate})
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
                else{
                    return res.sendStatus(404)
                }
            }   
        })
        .catch(err=>{
           console.log(err)
        })
})


route.post('/updateSlots',(req,res)=>{
    console.log(req.body)
        slots.findOne({providerId:req.body.providerId,date:req.body.scheduleDate})
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


route.post('/insert',(req,res)=>{
    console.log(req.body)
    user.create(req.body)
    res.send('user created')
})


route.post('/sendApt',(req,res)=>{
    console.log(req.body)
    const htmlToSend = template({name:req.body.patientName,doctor:req.body.providerName,speciality:req.body.speciality,date:req.body.date,time:req.body.time}) 
    const mailOptions = {
    from:'anyahealthcarebot@gmail.com', 
    to:req.body.emailId,  
    subject: 'Your appointment is confirmed',
    html: htmlToSend
        }  
      smtpTransport.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log('gmail')
          console.log(err);
          res.sendStatus(400)
        } 
        else {
            res.send('mail sent')    
            res.sendStatus(200)   
        }
      });
})


module.exports=route