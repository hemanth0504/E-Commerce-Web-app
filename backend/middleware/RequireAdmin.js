import User from "../models/User"
const requireAdmin = async (req,res,next)=>{

  if(!req.user)
  {
    return res.status(400).send("you are not logged in");
  }

 try {
    const user = await User.findById(req.user._id);
    if (!user || user.role !== "admin") {
      return res.status(403).send({ msg: "You do not have access to add products" });
    }
    next();
  } catch (err) {
    return res.status(500).send({ msg: "Error checking user role" });
  }

}

export default requireAdmin;