const route = require('express').Router()
const user = require('../model/policy')
const nodemailer=require("nodemailer")  

let transporter = {
    service: 'gmail',
    auth: {
    user: 'anyahealthcarebot@gmail.com' ,
    pass: 'deaq bxzg yfev pgdd',
    }
};


const smtpTransport = nodemailer.createTransport(transporter)


route.post('/sendNewPolicyMail',(req,res)=>{
    console.log(req.body)
    user.create(req.body)
    const mailOptions = {
    from:'anyahealthcarebot@gmail.com', 
    to:req.body.emailId,  
    subject: 'New Policy Status',
    text:"Your new policy request has been submitted to our review committee . They will review it and contact you within 5 business days"
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