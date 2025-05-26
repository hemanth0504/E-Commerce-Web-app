import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/db.js"; 
import authRouter from "./routes/auth.js"


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true              
}));

app.use("/",authRouter);


const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
      console.log("server is starting on 4000")
})