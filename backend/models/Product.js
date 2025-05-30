import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({


      _id:{
        type: mongoose.Schema.Types.ObjectId,
        default : ()=> new mongoose.Types.ObjectId()
      },
       name : {
            type : mongoose.Schema.Types.String,
            required: true
          },
       description : {
              type : mongoose.Schema.Types.String,
              required: true
            },
        price : {
          type: mongoose.Schema.Types.Number,
          required: true
        },
        image: 
        {
          type: mongoose.Schema.Types.String,
          required: true
        },
        category: 
        {
          type: mongoose.Schema.Types.String,
          required: true
        },
        countInStock: 
        {
          type: mongoose.Schema.Types.Number,
          required: true
        }}, {
          timestamps: true 
        })


const Product = mongoose.model("Product", ProductSchema);

export default Product;