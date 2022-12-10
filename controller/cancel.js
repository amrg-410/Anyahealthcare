const route = require('express').Router()
const user = require('../model/appt')

route.post('/cancelApt',(req,res)=>{
    console.log(req.body)
    user.deleteOne({patientName:req.body.patientName,providerName:req.body.providerName})
    .then((result)=>{
        console.log("Deleted")
        res.sendStatus(200)
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports=route