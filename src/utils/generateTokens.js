import jwt from "jsonwebtoken"

let generateAccessToken = (UserId)=>{
    return jwt.sign({id:UserId},process.env.JWT_ACCESS_SECRET,{
        expiresIn:"10m"
    })
}

let generateRefreshToken = (UserId)=>{
    return jwt.sign({id:UserId},process.env.JWT_REFRESH_SECRET,{
        expiresIn:"1d"
    })
}
export{generateAccessToken,generateRefreshToken}