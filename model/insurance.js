const mongoose=require("mongoose")
const  userSchema= mongoose.Schema({
    patientId:{
        type:String,
        required:false
    },
    patientName:{
        type:String,
        required:false
    },
    patientDob:{
        type:String,
        required:false
    },
    aadhaarSsn:{
        type:Number,
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
    }
},{versionKey:false})



const  userModel=mongoose.model('patientpolicydetails',userSchema)

module.exports=userModel