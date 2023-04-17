import React, { useState } from "react";
import TitleCarousel from "../../component/categorycarousel/categorycarousel";
import "./Category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

  return (
    <div className="category-wrapper">
      <div className="category-header">
        <h1 className="category-wrapper-title">Women's Wear</h1>
        <div className="category-searchbar">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search products..."
        />
        <button onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
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
