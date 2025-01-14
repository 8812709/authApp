require("dotenv").config()

const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
        ,trim:true
    },
    email:{
        type:String,
        require:true
        ,trim:true
    }
    ,
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"]
    },
    token:{
        type:String,
        required:false
    }

})

module.exports=mongoose.model("user",userSchema)