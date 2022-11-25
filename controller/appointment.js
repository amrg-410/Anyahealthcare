const route = require('express').Router()
// const user = require('../model/patient')
const doctor = require('../model/doctor')
const slots = require('../model/slots')
// const nodemailer=require("nodemailer")  
// const handlebars = require("handlebars")
// const fs = require("fs")
// const path = require("path")
// const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/templateApt.hbs"), "utf8") 

let transporter = {
    service: 'gmail',
    auth: {
    user: 'anyahealthcarebot@gmail.com' ,
    pass: 'deaq bxzg yfev pgdd',
    },
};

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
                return res.sendStatus(200)
            }   
        })
        .catch(err=>{
           console.log(err)
        })
})


route.post('/checkSlots',(req,res)=>{
    console.log(req.body)
        slots.findMany({providerId:req.body.providerId})
        .then((result)=>{
            console.log(result)
            if(result === null)
            {
                res.sendStatus(404)
            }
            else{
                for(var i=0;i<result.length;i++)
                {
                    if(result[i].date === req.body.scheduleDate.toString() && result[i].time.slice(0,2) === req.body.scheduleTime.toString().slice(1,3))
                    {
                        if(result[i].bookedStatus === false)
                        {
                            res.send(result[i])
                            //user.updateOne({providerId:{$gte:result[i].providerId},slotId:{$gte:result[i].slotId}},{bookedStatus : true})
                            return res.sendStatus(200)
                        }
                    }
                }   
            }   
        })
        .catch(err=>{
           console.log(err)
        })
})

route.post('/updateSlots',(req,res)=>{
    console.log(req.body)
        slots.findMany({providerId:req.body.providerId})
        .then((result)=>{
            console.log(result)
            if(result === null)
            {
                res.sendStatus(404)
            }
            else{
                for(var i=0;i<result.length;i++)
                {
                    if(result[i].date === req.body.scheduleDate.toString() && result[i].time.slice(0,2) === req.body.scheduleTime.toString().slice(1,3))
                    {
                        if(result[i].bookedStatus === false)
                        {
                            res.send(result[i])
                            user.updateOne({providerId:{$gte:result[i].providerId},slotId:{$gte:result[i].slotId}},{bookedStatus : true})
                            return res.sendStatus(200)
                        }
                    }
                }   
            }   
        })
        .catch(err=>{
           console.log(err)
        })
})

module.exports=route