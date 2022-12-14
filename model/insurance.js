const mongoose=require("mongoose")
const  userSchema= mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    address:{
        type:String,
        required:false
    },
    contactNo:{
        type:Number,
        required:false
    },
    emailId:{
        type:String,
        required:false
    },
    policyNo:{
        type:String,
        required:false
    },
    policyType:{
        type:String,
        required:false
    },
    amount:{
        type:String,
        required:false
    }
},{versionKey:false})



const  userModel=mongoose.model('policyDetails',userSchema)

module.exports=userModel