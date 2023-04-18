import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

function Category() {
  const categoryId = useParams();
  const [subCategories , setSubCategories]= useState([]);
  
  
useEffect(() => {    
  console.log(categoryId)
  axios
    .get(`http://localhost:5000/subcategories/list/${categoryId.categoryId}`)
    .then((response) => {
      setSubCategories(response.data.subcategories);
      console.log(response.data.subcategories);
    })
    .catch((error) => {
      console.log(error);
    });
}, [categoryId]);

console.log(subCategories);

  return (
    <>
    <div className='category-section'>
     {subCategories.map((sub, i)=>(
       <h1 key={i}>{sub.title}</h1>
       ))} 
    </div>
    </>
  )
};

export default Category
