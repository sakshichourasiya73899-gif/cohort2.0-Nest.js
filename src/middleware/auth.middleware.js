import userModel from "../models/auth.model.js"
import jwt from "jsonwebtoken"

let authMiddleware = async(req,res,next)=>{
    try{
        let accessToken = req.cookies.accesssToken;
        if(!accessToken){
            return res.status(404).json({
                message:"Access Token not found"
            })
        }
        let decode = jwt.verify(accessToken,process.env.JWT_ACCESS_SECRET)
        if(!decode){
            return res.status(401).json({
                message:"Invalid Access Token"
            })
        }
        let user = await userModel.findById(decode.id);
        req.user = user;
        next()
    }
    catch(error){
        throw new Error(error);
    }

}
export default authMiddleware;