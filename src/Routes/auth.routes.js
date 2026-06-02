import express from "express"
import {registerController,loginController,getAccessTokenController} from "../Controllers/authController.js"
import authMiddleware from "../middleware/auth.middleware.js"
let authRoutes = express.Router()


authRoutes.post("/register",registerController)
authRoutes.post("/login",loginController,authMiddleware)
authRoutes.get("/get-accessToken",getAccessTokenController)

export default authRoutes;