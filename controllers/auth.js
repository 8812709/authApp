const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const jwt=require("jsonwebtoken")
require("dotenv").config()

exports.signupHandler = async (req, res) => {
  // Parsing the data from req
  const { name, email, password, role } = req.body;

  try {
    // Checking for existing user
    const isExisting = await User.findOne({ email });
    if (isExisting) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Hashing the password using bcrypt
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (e) {
      console.log("Error while hashing the password");
      console.log(e);
      return res.status(500).json({
        success: false,
        message: "Error in hashing the password"
      });
    }

    // Inserting the data with hashed password into the database
    const saveData = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    return res.status(200).json({
      success: true,
      message: "User is Registered successfully",
      data: saveData
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Create User"
    });
  }
};


//function for login route handler

exports.loginHandler=async(req,res)=>{
 
  try {
    const {email,password}=req.body
    //if detials were missing from client side
    if(!email || !password)
    {
      return res.status(400).json({
        success:false,
        message:"Please fill up all the details"
      })
    }
    //if user doesnt exits then
    const user=await User.findOne({email})
    if(!user)
    {
      return res.status(401).json({
        success:false,
        message:"The user doesnt exists"
      })
    }

    //if user exits then check the password and generate a jwt token with cookies 
    const payLoad={
      email:user.email,
      role:user.role,
      id:user._id
    }

    if(await bcrypt.compare(password,user.password)){
      let token=jwt.sign(payLoad,process.env.JWT_SECRET,{
        expiresIn:"2hr"
      })
      //inserting the token inside the object user of the userSchema its not actually inserted in database though
      user.token=token
      user.password=undefined

//cokkies
      const options={
        expires:new Date(Date.now()+3*24*60*60*1000),
        httpOnly:true
      }
      res.cookie("cookieName",token,options).status(200).json({
        success:true,
        token,
        user,
        message:"User logged In successfully"
      })

    }
    else
    {
      return res.status(403).json({
        success:false,
        message:"password Invalid"
      })
    }


  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Error while logging In"
    })
  }
}