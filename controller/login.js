const route = require('express').Router()
const user = require('../model/patient')
const nodemailer=require("nodemailer")  
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8") 

let transporter = {
    service: 'gmail',
    auth: {
    user: 'anyahealthcarebot@gmail.com' ,
    pass: 'deaq bxzg yfev pgdd',
    },
};

const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)


//Generate OTP
function generateOTP() {  
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}


route.post('/verifyUser',(req,res)=>{
        user.findOne({patientDob:req.body.patientDob,aadharSsn:req.body.aadharSsn,patientZipcode:req.body.patientZipcode})
        .then((result)=>{
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
     user.findOne({patientDob:req.body.patientDob,aadharSsn:req.body.aadharSsn,patientZipcode:req.body.patientZipcode})
     .then((result)=>{
        const otp=generateOTP()
        result.otp=otp
        console.log(otp)
       const htmlToSend = template({user:result.patientName,otp:otp}) 
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
                result.save()
                res.send('mail sent')       
            }
          });
    })
    .catch(err=>{
        console.log(err)
    })
})


route.post('/checkOtp',(req,res)=>{
    user.findOne({patientDob:req.body.patientDob,aadharSsn:req.body.aadharSsn,patientZipcode:req.body.patientZipcode})
    .then((result)=>{
            if(result.otp === req.body.otp)
            {   console.log('Otp verified')
                    res.sendStatus(200)            
            }
            else{    
                res.sendStatus(400)
            }
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports=route
