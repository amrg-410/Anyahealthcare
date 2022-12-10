const route = require('express').Router()
const user = require('../model/appt')
const doctor = require('../model/doctor')
const slots = require('../model/slots')
const nodemailer=require("nodemailer")  
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/templateApt.hbs"), "utf8") 


let transporter = {
    service: 'gmail',
    auth: {
    user: 'anyahealthcarebot@gmail.com' ,
    pass: 'deaq bxzg yfev pgdd',
    }
};


const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)


route.post('/verifyApt',(req,res)=>{
  console.log(req.body)
      user.find({patientId:req.body.patientId})
      .then((result)=>{
          console.log(result.length)
          if(result.length === 0){
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


route.post('/modifyApt',(req,res)=>{
  console.log(req)
	doctor.findOne({providerName:req.body.providerName})
	.then((result)=>{
		slots.findOne({providerId:result.providerId,date:req.body.date})
    .then((rlt)=>{
      rlt.bookedStatus=false
      rlt.save()
      res.send(result.providerId)
    })
    .catch(err=>{
      console.log(err)
    })
	})
	.catch(err=>{
		console.log(err)
	})
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


route.post('/sendReApt',(req,res)=>{
  const htmlToSend = template({speciality:req.body.speciality,doctor:req.body.providerName,date:req.body.date,time:req.body.time}) 
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


module.exports=route