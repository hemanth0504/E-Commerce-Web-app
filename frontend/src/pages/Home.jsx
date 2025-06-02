import { useState } from "react";
import axios from "../api/axiosInstance.js";
import { useEffect } from "react";
import Product from "../../../backend/models/Product.js";


const Home = ()=>{

 const [products,setProducts] = useState([]);

 useEffect  (()=>{

  const fetchProducts = async ()=>{
    try {
          const token = localStorage.getItem("token");
    const response = await axios.get("/api/products", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
        setProducts(response.data.products);
    }
    catch(err)
    {
        console.error("Error fetching Data", err);
    }

  }
  fetchProducts();

 },[])

return (


  <div>
    {

      products.length ===0 ?(
        <p> Loading Products...</p>
      ) : (

          products.map((product)=>(

            <div key={product._id}>
              <h3>{product.name}</h3>
              <p>price : ${product.price}</p>
              
              <img src={product.image} alt="" />
            </div>

          ))

      )

    }


  </div>



)







}



export default Home;