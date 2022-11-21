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
    patientZipcode:{
        type:Number,
        required:false
    },
    aadharSsn:{
        type:String,
        required:false
    },
    contactNo:{
        type:Number,
        required:false1
    },
    emailId:{
        type:String,
        required:false
    }
},{versionKey:false})



const  userModel=mongoose.model('users',userSchema)

module.exports=userModel