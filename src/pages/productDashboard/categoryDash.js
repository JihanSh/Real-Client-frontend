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
  const [editMode, setEditMode] = useState(false);
  const [editMode1, setEditMode1] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [idCategory, setIdCategory] = useState(null);
  const [category, setCategory] = useState({
    title: "",
  });
  const columns = [
    { id: "remove", label: " ", minWidth: 100 },
    { id: "images", label: "Subcategory", minWidth: 100 },
    { id: "product", label: "Category", minWidth: 100 },
    { id: "edit", label: "edit", minWidth: 100 },
  ];
  const column = [
    { id: "title", label: "Category", minWidth: 100 },
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

  const getCategoryById = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(
        `http://localhost:5000/categories/${id}`
      );
      setCategory(response.data);
      setIdCategory(id);
      setEditMode1(true);
      console.log("get by id", category);
    } catch (error) {
      console.error(error);
    }
  };

  const form = useRef();

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const handleEditSubmitCategory = async (event) => {
    console.log(idCategory);
    event.preventDefault();
    fetch(`http://localhost:5000/categories/${idCategory}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded"
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: category.title,
      }),
    })
      .then((response) => response.json())
      .then(setEditMode1(false))
      .then(alert("You have updated the category name"));

    // Fetch the updated list of products
    const response = await axios.get(`http://localhost:5000/categories`);

    // Update the state of the products with the new list

    setCategories(response.data).catch((error) => console.error(error));
  };

  return (
    <>
      <div className="sub-cat-dash">
        <div className="catdash-section">
          <h1 className="cart-title-catdash">Category Dashboard</h1>
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
                      {column.map((colum) => (
                        <TableCell
                          key={colum.id}
                          align={colum.align}
                          style={{ minWidth: colum.minWidth }}
                        >
                          {colum.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categories.map((category, i) => (
                      <TableRow key={i}>
                        <TableCell>{category.title}</TableCell>
                        <TableCell>
                          <button
                            className="prodash-button"
                            onClick={() => getCategoryById(category._id)}
                          >
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
          {editMode1 && (
            <div className="subcat-form-container">
              <h1>Update Category Name</h1>
              <form
                className="cat-edit-form"
                onSubmit={handleEditSubmitCategory}
                ref={form}
              >
                <div className="username">
                  <label className="label-auth">Category name:</label> <br />
                  <input
                    className="subcat-edit-input"
                    type="text"
                    id="username"
                    placeholder="Category name"
                    name="title"
                    value={category.title}
                    onChange={handleCategoryChange}
                  />
                </div>
                <button className="subcat-edit-button" type="submit">
                  Update Subcategory
                </button>
              </form>
            </div>
          )}
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
            <form className="subcat-edit-form">
              <div className="username">
                <label className="label-auth">Subcategory name:</label> <br />
                <input
                  className="subcat-edit-input"
                  type="text"
                  id="username"
                  placeholder="Subcategory name"
                  name="name"
                />
              </div>

              <div className="username">
                <label className="label-auth">Category:</label> <br />
                <select id="category" name="categoryTitle">
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
            <form className="subcat-edit-form">
              <div className="username">
                <label className="label-auth">Subcategory name:</label> <br />
                <input
                  className="subcat-edit-input"
                  type="text"
                  id="username"
                  placeholder="Subcategory name"
                  name="name"
                />
              </div>

              <div className="username">
                <label className="label-auth">Category:</label> <br />
                <select id="category" name="categoryTitle">
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
