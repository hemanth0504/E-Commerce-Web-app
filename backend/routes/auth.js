import express from "express"
import hashPassword from "../utils/helper.js"
import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import requireAuth from "../middleware/RequireAuth.js";



const router = express.Router();


router.post("/api/auth/register", async (req,res)=>{

    const {name,email,password} = req.body;

    try{

        if(!name || !email || !password)
        {
          throw new Error("some credentials are missing");

        }

        const hashedPassword = await hashPassword(password);
        const data = {
          name : name,
          email  : email,
          password : hashedPassword
        }

        const userData = new User(data);
        const savedData = await userData.save();

        return res.status(200).send({msg: "User Registered Succesfully"});

    }
    catch(err){

        return res.status(400).send({msg : err.message});

    }
  })

    router.post("/api/auth/login", async (req,res)=>{
      console.log("Login body:", req.body);

      const {email,password} = req.body;
  
      try{
  
          if(!email || !password)
          {
            throw new Error("some credentials are missing");
  
          }

          const findUser = await User.findOne({email});
          if(!findUser)
          {
            throw new Error("user cannot be found");
          }
          const matchedPassword = bcrypt.compareSync(password,findUser.password);

          if(!matchedPassword)
          {
            throw new Error("invalid password");
          }

          const token = jwt.sign({
            userId: findUser._id, email: findUser.email
          },process.env.JWT_SECRET,{expiresIn : "1h"});




          return res.status(200).json({
            msg: "Login Successful",
            token: token
          });
          
  
      }
      catch(err){
  
          return res.status(400).send({msg : err.message});
  
      }
    })


    router.get("/api/auth/profile",requireAuth, async (req,res)=>{

        try{
           
        
      const{userId,email} = req.user;

      const findUser = await  User.findById(userId).select("-password");

      if(findUser)
      {
         return res.status(200).json(findUser);
      }
    } catch(err)
    {
      return res.status(400).send({msg:err.message});
    }



    })


    router.post("/api/auth/logout",requireAuth, async (req,res)=>{

      try{



         
   
  } catch(err)
  {
    return res.status(400).send({msg:err.message});
  }



  })











export default router;