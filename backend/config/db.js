import mongoose from "mongoose";

const dbConnect = mongoose.connect('mongodb://localhost/ecommerce-app').then(()=>{
      console.log("connected to database");
})

export default dbConnect;