const mongoose=require("mongoose")
const  userSchema= mongoose.Schema({
    patientName:{
        type:String,
        required:false
    },
    providerName:{
        type:String,
        required:false
    }
},{versionKey:false})



const  userModel=mongoose.model('appointments',userSchema)

module.exports=userModel