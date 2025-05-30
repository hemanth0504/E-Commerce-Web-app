import express from "express"
import requireAuth from "../middleware/RequireAuth";
import Product from "../models/Product";




const router = express.Router();


router.get("/api/products",requireAuth,async (req,res)=>{


  try{
       const data = await Product.find({});
       console.log(data);
       return res.status(200).send({products : data});

  }
  catch(err)
  {
   return   res.status(400).send("Couldn't fetch the data");
  }
     


})


router.post("/api/products",requireAuth,requireAdmin, async (req,res)=>{


  try{

    const {body} = req;

    const data = new Product(body);
    const savedData = await data.save();
       return res.status(200).send({product : savedData});

  }
  catch(err)
  {
   return   res.status(400).send("Couldn't post the data");
  }
     


})