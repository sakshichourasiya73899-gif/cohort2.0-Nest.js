import app from "./src/app.js";

let port = process.env.PORT||5000;

app.listen(port,()=>{
    console.log("Server is running on port 3000")
})