import React, { useEffect, useState } from "react";
import TitleCarousel from "../../component/categorycarousel/categorycarousel";
import "./Category.css";
import { useParams } from "react-router";
import { HeaderNavbar, MenuBar } from "../../component/Header/HeaderNavbar";

const Category = () => {
  const [menubar, setMenuBar] = useState(false);
  const [category, setCategory] = useState([]);
  const categoryId = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:5000/categories/${categoryId.categoryId}`
        );
        const data = await response.json();
        setCategory(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, [categoryId]);

  return (
    <>
      <HeaderNavbar setMenuBar={setMenuBar} menubar={menubar} />
      <MenuBar menubar={menubar} />
      <div className="category-wrapper">
        <div className="category-header">
          <h1 className="category-wrapper-title">{category.title}'s Wear</h1>
        </div>
        <TitleCarousel />
      </div>
    </>
  );
};

export default Category;
