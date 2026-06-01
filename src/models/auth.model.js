import mongoose from "mongoose"

let userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true, "Email is required"]
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    refreshToken:{
        type:String
    }
},{
    timestamps:true
});
 let userModel = mongoose.model("User",userSchema)
export default userModel