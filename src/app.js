import express from 'express';
import connectDB from './config/db.js'
import cookieParser from "cookie-parser"
import authRoutes from "./Routes/auth.routes.js"
import homeRoutes from "./Routes/home.routes.js"
import {getAccessTokenController} from "./Controllers/authController.js"




let app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api",homeRoutes)
app.use("/api",authRoutes)
connectDB();

export default app;
