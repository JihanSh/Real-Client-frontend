import React from 'react'
import './Product.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const Product = () => {
  const productId = useParams();
  const [product , setProduct]= useState([]);
  
    
useEffect(() => {    
  console.log(productId)
  axios
    .get(`http://localhost:5000/products/${productId.productId}`)
    .then((response) => {
      setProduct(response.data);
     
    })
    .catch((error) => {
      console.log(error);
    });
}, [productId]);

  return (
    <>
    <div className='product'>
    <div className='product-section'>
      <div className='product-images'>
        
        
      </div>
      <div className='product-info'>
       <h2>{product.name}</h2>
       <p>{product.price}</p>
       <p>{product.discountedPrice}</p>
       <p>{product.size}</p>
       <button className='product-addToCart'>ADD TO CART</button>
     </div>
    </div>
    </div>
    </>
  )
}

export default Product