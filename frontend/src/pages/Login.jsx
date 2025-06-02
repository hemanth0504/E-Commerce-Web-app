import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from 'react-router-dom';


const Login = ()=>{

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async()=>{

      try{ 

     const res =  await  axios.post("/api/auth/login",{email,password});
      localStorage.setItem("token", res.data.token);
      window.alert("login successful")
      console.log(localStorage.getItem("token"));
        navigate("/home")
      
      }
      catch(err)
      {
        console.log(err);
      }


    }

    const handleSignUp = ()=>{
      navigate('/signup')

    }




  return(

    <div className="flex flex-col md:flex-row h-dvh w-dvw">


        {/*left section */}
        <div className="w-full md:w-[45%]">


        {/* LOGO */}
          <div className="m-8">
           <p className="font-inter text-2xl text-gray-600 font-semibold">Second <span className="text-violet-400">Skin </span></p>
          </div>

          {/* Login */}

          <div className="mx-[20%] my-[15%] h-[60%] w-[70%] flex flex-col justify-center">

          <div className="text-left">
            <p className="text-2xl font-inter text-violet-900 font-medium"> Welcome Back</p>
            <p className="text-sm font-light mt-3 font-poppins text-gray-600">Please enter your details</p>

            <form className="mt-10" action="" onSubmit={(e)=>{
              e.preventDefault();
              handleLogin();
            }}>
              <div className="mb-4">
          <label className="block font-poppins text-violet-600" htmlFor="Email Address">Email address</label>
          <input className="rounded-md mx-1 my-2 p-1 w-60 border border-gray-300 focus:outline-none focus:border-gray-400 font-serif" type="email" onChange={(e)=>{
                      setEmail(e.target.value);
          }}  />
          <label className="block font-poppins text-violet-600" htmlFor="password "> Password</label>
          <input className="rounded-md mx-1 my-2 p-1 w-60 border border-gray-300 focus:outline-none focus:border-gray-400 font-inter" type="password" value={password} onChange={(e)=>{
                    setPassword(e.target.value);

          }}  />
     </div>
          <button className="rounded bg-[#a67ed7] px-4 py-2 m-3 hover:bg-violet-700 ml-1 text-white font-poppins" type="submit">Login</button>
              <span className="ml-8  text-sm text-gray-500 hover:underline hover:cursor-pointer">Forgot Password?</span>
            </form>
            <span className="font-poppins text-sm font-light mt-5 ml-1">Don't Have an Account? </span>  <span className="ml-6 text-sm underline hover:cursor-pointer font-medium" onClick={()=>{handleSignUp()}}>Sign up</span>
    
          </div>
          
          


          </div>


        </div>
    {/*Right section */}
    <div className="w-full md:w-1/2 border border-gray-100 flex flex-col justify-center bg-violet-300 ">

          <img className="object-cover " src="../../public/Ecommerce checkout laptop-amico.png" alt="" />




    </div>




    </div>

















  )



}




export default Login;