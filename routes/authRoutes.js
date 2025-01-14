const express=require("express")
const router=express.Router()

// defning route handlers 
const{signupHandler,loginHandler}=require("../controllers/auth")

//linking the handlers w routes
router.post("/login",loginHandler)
router.post("/signup",signupHandler)


//exporting the module
module.exports=router