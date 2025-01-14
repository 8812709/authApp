const express=require("express")
const cookieParser = require("cookie-parser");
const app=express()

app.use(express.json())
app.use(cookieParser());
require("dotenv").config

const {connectDatabase}=require("./config/database")
connectDatabase()

const authRoutes=require("./routes/authRoutes")
app.use("/api/v1",authRoutes)


PORT=process.env.PORT || 4000
app.listen(PORT,()=>{console.log(`server is running at port ${PORT}`)})

//default route
app.get("/",(req,res)=>{
    res.send("Hello this is the homepage")
})