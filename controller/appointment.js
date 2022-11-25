const route = require('express').Router()
const user = require('../model/patient')
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
    },
};

const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)

route.post('/verifyDoctor',(req,res)=>{
    console.log(req.body)
        user.findOne({providerZipcode:req.body.zipCode,providerSpeciality:req.body.speciality})
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