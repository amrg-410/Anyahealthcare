const mongoose=require("mongoose")
const  userSchema= mongoose.Schema({
    policyNumber:{
        type:String,
        required:false
    },
    claimHolder:{
        type:String,
        required:false
    },
    claimType:{
        type:String,
        required:false
    },
    firstTreatment:{
        type:String,
        required:false
    },
    motorAccident:{
        type:String,
        required:false
    },  
    aboutAccident:{
        type:String,
        required:false
    },
    hospitalAdmittance:{
        type:String,
        required:false
    },
    sign:{
        type:String,
        required:false
    }

},{versionKey:false})



const  userModel=mongoose.model('claims',userSchema)

module.exports=userModel