const mongoose=require("mongoose")
const  userSchema= mongoose.Schema({
    providerId:{
        type:String,
        required:false
    },
    slotId:{
        type:String,
        required:false
    },
    date:{
        type:String,
        required:false
    },
    time:{
        type:String,
        required:false
    },
    duration:{
        type:String,
        required:false
    },
    location:{
        type:String,
        required:false
    },
    bookedStatus:{
        type:Boolean,
        required:false
    }

},{versionKey:false})



const  userModel=mongoose.model('slotDetails',userSchema)

module.exports=userModel