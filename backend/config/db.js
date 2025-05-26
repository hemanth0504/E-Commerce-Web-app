import mongoose from "mongoose";

const dbConnect = mongoose.connect('mongodb://localhost/blog-app').then(()=>{
      console.log("connected to database");
})

export default dbConnect;