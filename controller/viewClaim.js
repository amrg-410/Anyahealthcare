const route = require('express').Router()
const user = require('../model/claims')


route.post('/fetchClaims',(req,res)=>{
    console.log(req.body)
        user.find({name:req.body.name})
        .then((result)=>{
            console.log(result.length)
            if(result.length === 0){
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


module.exports=route