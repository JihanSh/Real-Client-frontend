import React, { useEffect, useState } from "react";
import TitleCarousel from "../../component/categorycarousel/categorycarousel";
import "./Category.css";
import { useParams } from "react-router";

const Category = () => {
  const [category, setCategory] = useState([]);
  const categoryId = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/categories/${categoryId.categoryId}`);
        const data = await response.json();
        setCategory(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, [categoryId]);
  
  
  return (
    <div className="category-wrapper">
      <div className="category-header">
        <h1 className="category-wrapper-title">{category.title}'s Wear</h1>
      </div>
      <TitleCarousel />
    </div>
  );
};

export default Category;
