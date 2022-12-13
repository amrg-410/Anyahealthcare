const route = require('express').Router()
const user = require('../model/insurance')


route.post('/fetchDetails',(req,res)=>{
    user.findOne({name:req.body.name})
    .then((result)=>{
        res.send(result)
        return res.sendStatus(200)
    })
    .catch(err=>{
        console.log(err)
    })
})


route.post('/fetchDependence',(req,res)=>{
    user.findOne({name:req.body.name})
    .then((result)=>{
        res.send(result)
        return res.sendStatus(200)
    })
    .catch(err=>{
        console.log(err)
    })
})