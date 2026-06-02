import userModel from "../models/auth.model.js";
import bcrypt from "bcrypt";
import { generateAccessToken,generateRefreshToken } from "../utils/generateTokens.js";

let registerService = async(data,res)=>{
    try{
        let{name,email,password }= data
        console.log(data)
        if(!name||!email||!password){
        return res.status(400).json({
            message:"All field are required"
        })
    }
    let isExisting = await userModel.findOne({email})
    if(isExisting){
        return res.status(409).json({
            message:"user already exists"
        })
    }
    let hashedPassword = bcrypt.hashSync(password,10)
    let newUser = await userModel.create({
        name,
        email,
        password:hashedPassword
    })

    let accessToken = generateAccessToken(newUser._id);
    let refreshToken = generateRefreshToken(newUser._id);
    newUser.refreshToken = refreshToken
    await newUser.save();

    return{
        accessToken, refreshToken, newUser
    }
       
    }
    catch(error){
      throw new Error(error)
    }
}

let loginService = async(data)=>{
    try{
        let{email,password }= data
        if(!email||!password){
        return res.status(400).json({
            message:"All field are required"
        })
    }
    let isExisting = await userModel.findOne({email})
    if(!isExisting){
        return res.status(404).json({
            message:"user does not exist"
        })
    }
    let hashedPassword = bcrypt.compareSync(password,isExisting.password)
    if(!hashedPassword){
        return res.status(200).json({
            message:"invalid credentials"
        })
    }

    let accessToken = generateAccessToken(isExisting._id);
    let refreshToken = generateRefreshToken(isExisting._id);

    return{
        accessToken, refreshToken, isExisting
    }
       
    }
    catch(error){
      throw new Error(error)
    }
}
let getAccessTokenService = async(refreshToken)=>{
    let decode = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET)
   if(!decode){
    throw new Error("unauthorized")
    

   }
   let user = await userModel.findById(decode.id);
    if(refreshToken!==user.referenceToken)
        throw new Error("invalid token")

        let accessToken = generateAccessToken(user._id);
       return accessToken;  

}
export {registerService,loginService,getAccessTokenService}