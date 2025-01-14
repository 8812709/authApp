//function which will check the authenticity for the roles of admin and student
const jwt=require("jsonwebtoken")
require("dotenv").config()
//cookie parser 


exports.auth=(req,res,next)=>{
    try {
        //parse the value of token 
    const token=req.body.token || req.cookies.logincookie||req.header("Authorization").replace("Bearer ","");

    console.log(req.body.token)
    console.log(req.cookies.logincookie)
    //go to authorization header and replace the bearer_ with space and only token will remain in it which i am about to use

    //check if the token is present or not
    if(!token)
    {
        return res.status(404).json({
            success:false,
            message:"Token Missing"
        })
    }

    //if token is found then verify it 
    try {
        const payload=jwt.verify(token,process.env.JWT_SECRET)
        console.log(payload)
        req.user=payload //inserting the value of payload in request
    } catch (error) {
        return res.status(403).json({
            success:false,
            message:"Invalid Token"
        })
        
    }
    next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Some error occured while verifying the JWT"
        })
    }
    
}

exports.isStudent=(req,res,next)=>{
    // parse the role from the user
    try {
        if(req.user.role!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for student,u cannot access it"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"user role is not matching"
        })
    }
}

//function for the admin route

exports.isAdmin=(req,res,next)=>{
    try {
        if(req.user.role!=="Admin"){
            return res.status(403).json({
                success:false,
                message:"This is a Protected route for Admin,u cannot get there"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"The user route is not matching"
        })
    }
    
}