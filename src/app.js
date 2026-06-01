import express from 'express';
import connectDB from './config/db.js'
import cookieParser from "cookie-parser"
import authRoutes from "./Routes/auth.routes.js"




let app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",authRoutes)
connectDB();

export default app;