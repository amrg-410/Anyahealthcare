const mongoose=require("mongoose")
const  userSchema= mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    dependenceName:{
        type:Number,
        required:false
    },
    relation:{
        type:Number,
        required:false
    }
},{versionKey:false})



const  userModel=mongoose.model('dependenceDetails',userSchema)

module.exports=userModel