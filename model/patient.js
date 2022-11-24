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
    age:{
        type:Number,
        required:false
    },
    
    aadharSsn:{
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
    patientZipcode:{
        type:Number,
        required:false
    },
    otp:{
        type:Number,
        required:false
    }
},{versionKey:false})



const  userModel=mongoose.model('patientDetails',userSchema)

module.exports=userModel