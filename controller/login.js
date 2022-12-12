const route = require('express').Router()
const user = require('../model/patient')
const bcrypt = require("bcrypt")
const nodemailer=require("nodemailer")  
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/templateOtp.hbs"), "utf8") 

let transporter = {
    service: 'gmail',
    auth: {
    user: 'anyahealthcarebot@gmail.com' ,
    pass: 'deaq bxzg yfev pgdd',
    }
};

const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)


function generateOTP() {  
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}


route.post('/verifyUser',(req,res)=>{
        console.log(req.body)
        user.findOne({patientDob:req.body.patientDob,aadhaarSsn:req.body.aadhaarSsn,patientZipcode:req.body.zipCode})
        .then((result)=>{
            console.log(result)
            if(result === null)
            {
                res.sendStatus(404)
            }
            else{
                res.sendStatus(200)
            }   
        })
        .catch(err=>{
           console.log(err)
        })
})


route.post("/sendMail",(req,res)=>{
    console.log(req.body)
        user.findOne({patientDob:req.body.patientDob,aadhaarSsn:req.body.aadhaarSsn,patientZipcode:req.body.zipCode})
        .then((result)=>{ 
        const otp=generateOTP()
        result.otp=otp
        result.save()
        console.log(result.otp)
        const htmlToSend = template({name:result.patientName,otp:otp}) 
        const mailOptions = {
        from:'anyahealthcarebot@gmail.com', 
        to:result.emailId,
        subject: `OTP for Patient Verification(Anya Health Care)`,
        html: htmlToSend
            }  
          smtpTransport.sendMail(mailOptions, function (err, info) {
            if (err) {
              console.log('gmail')
              console.log(err);
              res.sendStatus(400)
            } else {
                res.send('mail sent')    
                res.sendStatus(200)   
            }
          });
    })
    .catch(err=>{
        console.log(err)
    })
})


route.post('/checkOtp',(req,res)=>{
    user.findOne({patientDob:req.body.patientDob,aadhaarSsn:req.body.aadhaarSsn,patientZipcode:req.body.zipCode})
    .then((result)=>{
            console.log(req.body.otp)
            console.log(result.otp)
            bcrypt.compare(result.otp,req.body.otp,function(err,info){
                if(err){
                    return res.sendStatus(400)
                }
                else{
                    console.log('Otp verified')
                    res.send(result)
                    // res.sendStatus(200)
                }
            })
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports=route