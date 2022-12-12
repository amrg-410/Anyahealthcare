const mongoose=require("mongoose")
const  userSchema= mongoose.Schema({
    firstName:{
        type:String,
        required:false
    },
    lastName:{
        type:String,
        required:false
    },
    emailId:{
        type:String,
        required:false
    },
    address:{
        type:String,
        required:false
    },  
    lastNicotineUsed:{
        type:String,
        required:false
    },
    subsidy:{
        type:String,
        required:false
    },
    felony:{
        type:String,
        required:false
    },
    drunkAndDrive:{
        type:String,
        required:false
    }

},{versionKey:false})



const  userModel=mongoose.model('reviewNewPolicies',userSchema)

module.exports=userModel