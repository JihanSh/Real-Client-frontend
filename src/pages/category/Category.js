import React, { useEffect, useState } from "react";
import TitleCarousel from "../../component/categorycarousel/categorycarousel";
import "./Category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [category, setCategory] = useState([]);

  const categoryId = "6434408e01647f07fd0153cf";
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/products/search?q=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/categories/${categoryId}`);
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
        <div className="category-searchbar">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products..."
          />
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>

      {searchResults.length > 0 &&
        searchResults.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      <TitleCarousel />
    </div>
  );
};

export default Category;
