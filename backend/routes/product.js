import express from "express"
import requireAuth from "../middleware/RequireAuth.js";
import Product from "../models/Product.js";
import requireAdmin from "../middleware/RequireAdmin.js";




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

router.get("/api/products/:id",requireAuth,async (req,res)=>{


  try{
      const id = req.params.id;
       const data = await Product.findById(id);
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
     console.error("Error posting product:", err);
   return   res.status(400).send("Couldn't post the data");
  }
     


})

router.put("/api/products/:id",requireAuth,requireAdmin, async (req,res)=>{


  try{

    const {body} = req;
    const id = req.params.id;
    const data = await Product.findByIdAndUpdate(id,body,{new:true});
    if(!data)
    {
      res.status(400).send("couldnt update the data");
    }
       return res.status(200).send({product : data});

  }
  catch(err)
  {
     console.error("Error posting product:", err);
   return   res.status(400).send("Couldn't post the data");
  }
     


})


router.delete("/api/products/:id", requireAuth, requireAdmin, async (req, res) => {
  const id = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ msg: "Product not found" });
    }

    return res.status(200).send({ msg: "Product deleted successfully", product: deletedProduct });
  } catch (err) {
    return res.status(500).send({ msg: "Error deleting product", error: err.message });
  }
});










export default router;