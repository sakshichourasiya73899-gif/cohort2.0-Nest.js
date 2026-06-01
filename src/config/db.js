import mongoose from "mongoose";

let connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGOURI);
        console.log("Mongo DB connected")
    }
    catch(err){
        console.log("error in connecting DB ",err);
    }
}

export default connectDB;