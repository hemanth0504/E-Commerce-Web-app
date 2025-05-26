
import jwt from "jsonwebtoken"


const requireAuth = (req,res,next)=>{

    const authHeader = req.headers.authorization;

    console.log("Authorization header:", req.headers.authorization);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Missing token" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { userId, email }
      next();
    } catch (err) {
      console.log("JWT error:", err.message); 
      return res.status(401).json({ msg: "Invalid or expired token" });
    }
  };


  export default requireAuth;