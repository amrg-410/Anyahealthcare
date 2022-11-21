const route = require('express').Router()
const user = require('./model/patient')
const nodemailer=require("nodemailer")  
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8") //change

let transporter = {
    service: 'hotmail',
    auth: {
    user:process.env.user ,
    pass:process.env.pass,
    },
};// change

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

