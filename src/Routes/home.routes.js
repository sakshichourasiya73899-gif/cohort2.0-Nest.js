import express from "express"

let homeRoutes = express.Router()
homeRoutes.get("/home",(req,res)=>{
    res.status(200).json({
        message:"Home Fectched"
    })
})
export default homeRoutes