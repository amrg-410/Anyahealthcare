const mongoose=require("mongoose")
const  userSchema= mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    dependentsName:{
        type:String,
        required:false
    },
    relation:{
        type:String,
        required:false
    }
},{versionKey:false})



const  userModel=mongoose.model('dependenceDetails',userSchema)

module.exports=userModel