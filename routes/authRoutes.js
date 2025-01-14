const express=require("express")
const router=express.Router()

// defning route handlers 
const{signupHandler,loginHandler}=require("../controllers/auth")
const{auth,isAdmin,isStudent}=require("../middlewares/middleware")
const User=require("../models/userSchema")

//linking the handlers w routes
router.post("/login",loginHandler)
router.post("/signup",signupHandler)

//protected routes using middleware 
router.get("/test",auth,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"test successfull for auth middleware,its working fine"
    })
})

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to the protected Route of Admin"
    })
})

router.get("/student",auth,isStudent,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to the protected Route of Student"
    })
})

router.get("/getData",auth,async(req,res)=>{
    const id=req.user._id
    const user=await User.findOne({id})
    user.password=undefined
    if(!user)
    {
        return res.status(404).json({
            success:false,
            message:"no data found"
        })
    }
    res.status(200).json({
        success:true,
        data:user,
        message:"The data is found"
    })
})


//exporting the module
module.exports=router