import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name : {
      type : mongoose.Schema.Types.String,
      required: true
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    role: {
      type: mongoose.Schema.Types.String,
      enum: ['user', 'admin'],
      default: 'user'
    }
})


const User = mongoose.model("User", userSchema);
export default User;