const route = require('express').Router()
const doctor = require('../model/doctor')

route.post('/vicinity',(req,res)=>{
    console.log(req.body)
    doctor.find({providerZipcode:req.body.zipCode,providerSpeciality:req.body.speciality})
    .then((result)=>{
        res.send(result)
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports=route