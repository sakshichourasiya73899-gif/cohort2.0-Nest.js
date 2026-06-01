import userModel from "../models/auth.model.js";
import bcrypt from "bcrypt"
import registerService from "../Services/registerService.js";

let registerController=async(req,res)=>{
  try{
   let {accessToken,refreshToken,newUser} = await registerService(req.body)
    
    res.cookies('accessToken',accessToken,{
      httpOnly:true,
      secure:true,
      sameSite:'lax',
      maxAge:10*60*1000
    })
    res.cookie('refreshToken',refreshToken,{
      httpOnly:true,
      secure:true,
      sameSite:'lax',
      maxAge:24*60*60*1000
    })
    
    return res.status(201).json({
      message:"user registered successfully",
      user: newUser
      
    })
   
       
  }
  catch(error){
    console.log(error)
  }
  let loginController=async(req,res)=>{

  }
}
module.exports ={
    registerController
}