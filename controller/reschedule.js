const route = require('express').Router()
const user = require('../model/appt')
const doctor = require('../model/doctor')
const slots = require('../model/slots')
const nodemailer=require("nodemailer")  
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const { resourceLimits } = require('worker_threads')
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/templateApt.hbs"), "utf8") 

let transporter = {
    service: 'gmail',
    auth: {
    user: 'anyahealthcarebot@gmail.com' ,
    pass: 'deaq bxzg yfev pgdd',
    },
};

const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)



route.post('/verifyApt',(req,res)=>{
  user.find({patientId:req.body.patientId})
  .then((result)=>{
          res.send(result)
  })
  .catch(err=>{
    console.log(err)
 })
})


route.post('/sendApt',(req,res)=>{
    const htmlToSend = template({name:req.body.patientName,doctor:req.body.providerName,date:req.body.date,time:req.body.time}) 
    const mailOptions = {
    from:'anyahealthcarebot@gmail.com', 
    to:req.body.emailId,  
    subject: 'Your appointment has been rescheduled',
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


route.post('/updateApt',(req,res)=>{
  console.log(req.body)
  user.findOne({patientId:req.body.patientId,providerSpeciality:req.body.speciality})
  .then((result)=>{
    result.date=req.body.date
    result.time=req.body.time
    result.save()
    return res.sendStatus(200)
  })
  .catch(err=>{
    console.log(err)
 })
})


module.exports=route