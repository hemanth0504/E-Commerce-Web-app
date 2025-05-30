import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/db.js"; 
import authRouter from "./routes/auth.js"
import productRouter from "./routes/product.js"


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use("/",authRouter);
app.use("/",productRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
      console.log(`server is starting on ${PORT} `)
})