const route = require('express').Router()
const user = require('../model/appt')
const nodemailer=require("nodemailer")  
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/tempCancel.hbs"), "utf8") 

let transporter = {
    service: 'gmail',
    auth: {
    user: 'anyahealthcarebot@gmail.com' ,
    pass: 'deaq bxzg yfev pgdd',
    }
};


const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)


route.post('/cancelApt',(req,res)=>{
    console.log(req.body)
    user.deleteOne({patientName:req.body.patientName,providerName:req.body.providerName})
    .then((result)=>{
        console.log("Deleted")
        res.sendStatus(200)
    })
    .catch(err=>{
        console.log(err)
        res.sendStatus(400)
    })
})


route.post('/sendCancel',(req,res)=>{
    console.log(req.body)
    const htmlToSend = template({name:req.body.patientName}) 
    const mailOptions = {
    from:'anyahealthcarebot@gmail.com', 
    to:req.body.emailId,  
    subject: 'Your appointment is canceled',
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