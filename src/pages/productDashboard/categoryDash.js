import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./productDashboard.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "react-confirm-alert/src/react-confirm-alert.css";
import edit from "./images/icons8-create-64.png";

const CategoryDash = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [editMode, setEditMode] = useState(true);
  const [addMode, setAddMode] = useState(true);
  const columns = [
    { id: "remove", label: " ", minWidth: 100 },
    { id: "images", label: "Images", minWidth: 100 },
    { id: "product", label: "Product", minWidth: 100 },
    { id: "edit", label: "edit", minWidth: 100 },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/subcategories");
        setSubcategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
    fetchSubcategories();
  }, []);

  return (
    <>
      <div className="sub-cat-dash">
        <div className="catdash-section">
          <h1 className="cart-title-catdash">Category Dashboard</h1>
          {categories.map((category, i) => (
            <ul className="catdash-list" key={i}>
              <li>{category.title}</li>
              <button className="prodash-button">
                <img className="prodash-icon" src={edit} alt="#" />
              </button>
            </ul>
          ))}
        </div>
        <div className="subdash-section">
          <h1 className="cart-title-catdash">subcategory Dashboard</h1>
          <div className="cart-table-prodash">
            <Paper
              sx={{
                width: "75%",

                overflow: "hidden",
                marginLeft: "auto",
                marginRight: "auto",
                border: "#0B486A solid 1px",
              }}
            >
              <TableContainer sx={{ maxHeight: "600px" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subcategories.map((product, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <button className="cart-button-icon">
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              className="cart-Xicon"
                            />
                          </button>
                        </TableCell>
                        <TableCell>{product.title}</TableCell>
                        <TableCell>{product.category.title}</TableCell>
                        <TableCell>
                          <button className="prodash-button">
                            <img className="prodash-icon" src={edit} alt="#" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      </div>
      <div className="forms-section">
        {addMode && (
          <div className="subcat-form-container">
            <h1>Add Subcategory</h1>
            <form
              className="subcat-edit-form"
            >
              <div className="username">
                <label className="label-auth">Product name:</label> <br />
                <input
                  className="subcat-edit-input"
                  type="text"
                  id="username"
                  placeholder="Product name"
                  name="name"
                
                />
              </div>
             
              <div className="username">
                <label className="label-auth">Category:</label> <br />
                <select
                  id="category"
                  name="categoryTitle"
                  
                >
                  <option value="">Select a category...</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
             
              <button className="subcat-edit-button" type="submit">
                Add Subcategory
              </button>
            </form>
          </div>
        )}
        {editMode && (
          <div className="subcat-form-container">
            <h1>Update Subcategory</h1>
            <form
              className="subcat-edit-form"
            
            >
              <div className="username">
                <label className="label-auth">Product name:</label> <br />
                <input
                  className="subcat-edit-input"
                  type="text"
                  id="username"
                  placeholder="Product name"
                  name="name"
                  
                />
              </div>
            
              <div className="username">
                <label className="label-auth">Category:</label> <br />
                <select
                  id="category"
                  name="categoryTitle"
               
                >
                  <option value="">Select a category...</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
             
              <button className="subcat-edit-button" type="submit">
                Update Subcategory
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryDash;
