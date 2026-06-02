import { registerService,loginService,getAccessTokenService} from "../Services/registerService.js";

let registerController=async(req,res)=>{
  try{
   let {accessToken,refreshToken,newUser} = await registerService(req.body,res)
   console.log(req.body)
    
    res.cookie('accessToken',accessToken,{
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
 
 
}
 let loginController=async(req,res)=>{
       try{
        let {accessToken,refreshToken,isExisting} = await loginService(req.body) //how here req.body gives email and password not the name
           
         res.cookie('accessToken',accessToken,{
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
    
    return res.status(200).json({
      message:"user logged in successfully",
      isExisting
      
    })

       }
       catch(error){
         console.log(error)
       }
  }
 let getAccessTokenController= async(req,res)=>{
  let refreshToken = req.cookies.refreshToken;
  let accessToken = await getAccessTokenService(refreshToken)
  if(!refreshToken){
    return res.status(401).json({
      message:"Refresh Token not found"
    })
  }
 res.cookie('accessToken',accessToken,{
  httpOnly:true,
  secure:false,
  sameSite:"lax",
  maxAge:10*60*1000
 })

   return res.status(200).json({
    message:"Access token generated"
   })
  //if the result is true then
 } 

export {registerController,
  loginController,getAccessTokenController}