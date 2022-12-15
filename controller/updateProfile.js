const route = require('express').Router()
const user = require('../model/insurance')
const patient = require('../model/patient')
const dependence = require('../model/dependence')

route.post('/fetchDetails',(req,res)=>{
    console.log(req.body)
    user.findOne({name:req.body.name})
    .then((result)=>{
        res.send(result)
        return res.sendStatus(200)
    })
    .catch(err=>{
        console.log(err)
    })
})


route.post('/updateDetails',(req,res)=>{
    console.log(req.body)
    user.findOne({policyNo:req.body.policyNo})
    .then((result)=>{
        console.log("User updated in insurance")
        result.name=req.body.name
        result.address=req.body.address
        result.emailId=req.body.emailId
        result.contactNo=req.body.contactNo
        result.save()
        res.sendStatus(200)
    })
    .catch(err=>{
        console.log(err)
    })
    patient.findOne({patientId:req.body.patientId})
    .then((result)=>{
        console.log("User updated in patient")
        result.patientName=req.body.name
        result.emailId=req.body.emailId
        result.contactNo=req.body.contactNo
        result.save()
    })
    .catch(err=>{
        console.log(err)
    })
    
})


route.post('/upgradeDependencies',(req,res)=>{
    console.log(req.body)
    dependence.create(req.body)
    console.log("Dependents created")
    res.sendStatus(200)
})


module.exports=route