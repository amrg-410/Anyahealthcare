const route = require('express').Router()
const user = require('../model/claims')


route.post('/fetchClaims',(req,res)=>{
    console.log(req.body)
    user.find({name:req.body.name})
    .then((result)=>{
        if(result.length === 0){
            res.sendStatus(404)
        }
        else{
            console.log(result)
            res.send(result)
            return res.sendStatus(200)
        }
    })
})


module.exports=route