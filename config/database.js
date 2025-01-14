const mongoose=require("mongoose")
require("dotenv").config()

exports.connectDatabase=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("database connected successfully")})
    .catch((err)=>{console.log("some error occured while connecting database",err)
        process.exit(1)
    })

}