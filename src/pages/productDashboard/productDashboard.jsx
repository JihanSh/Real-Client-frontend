import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./productDashboard.css";
import ReactLoading from "react-loading";
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
import { HeaderNavbar, MenuBar } from "../../component/Header/HeaderNavbar";

function ProductDashboard() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [menubar, setMenuBar] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [id, setId] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    categoryTitle: "",
    subcategoryTitle: "",
    price: "",
    discountPercentage: "",
    size: "",
    
    images: [],
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const columns = [
    { id: "remove", label: " ", minWidth: 100 },
    { id: "images", label: "Images", minWidth: 100 },
    { id: "product", label: "Product", minWidth: 100 },
    { id: "size", label: "Size", minWidth: 100 },
    { id: "price", label: "Price", minWidth: 100 },
    { id: "category", label: "Category", minWidth: 100 },
    { id: "subcategory", label: "Subcategory", minWidth: 100 },
    { id: "edit", label: "edit", minWidth: 100 },
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [products]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirm) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch the product data on component mount

  const getProductById = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(response.data);
      setId(id);
      setEditMode(true);
      console.log("get by id", product);
    } catch (error) {
      console.error(error);
    }
  };


  // Fetch the category and subcategory data on component mount
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
  const form = useRef();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (event) => {
    setSelectedImages([...event.target.files]);
  };

  const handleEditSubmit = async (event) => {
    console.log(id);
    event.preventDefault();

    try {
      const formData = new FormData();
      for (const image of selectedImages) {
        formData.append("images", image);
      }
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("categoryTitle", product.categoryTitle);
      formData.append("subcategoryTitle", product.subcategoryTitle);
      formData.append("price", product.price);
      formData.append("discountPercentage", product.discountPercentage);
      formData.append("size", product.size);
     

      await axios.put(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("You have updated the product info!");
      setEditMode(false);
      
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAdd = (() =>{
    setAddMode(true);
  });

  const handleAddSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      for (const image of selectedImages) {
        formData.append("images", image);
      }
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("categoryTitle", product.categoryTitle);
      formData.append("subcategoryTitle", product.subcategoryTitle);
      formData.append("price", product.price);
      formData.append("discountPercentage", product.discountPercentage);
      formData.append("size", product.size);
     

      await axios.post(`http://localhost:5000/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("You have Added a new product");
      setAddMode(false);
      // window.location.reload(true);
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <HeaderNavbar setMenuBar={setMenuBar} menubar={menubar} />
      <MenuBar menubar={menubar} />
      {loading ? (
        <ReactLoading
          className="loading-container"
          type="spinningBubbles"
          color="#FF7D00"
          height={200}
          width={100}
        />
      ) : (
        <div className="prodash-section">
          <div className="cart-wrapper-prodash">
            <div className="cart-header-prodash">
              <h1 className="cart-title">Product Dashboard</h1>
              <div className="cart-totals-second">
                <button className="cart-totals-second-button" onClick={handleAdd}>
                  Add Product
                </button>
              </div>
            </div>
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
                      {products.map((product, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <button
                              className="cart-button-icon"
                              onClick={() => handleDelete(product._id)}
                            >
                              <FontAwesomeIcon
                                icon={faCircleXmark}
                                className="cart-Xicon"
                              />
                            </button>
                          </TableCell>
                          <TableCell className="cart-item-image">
                            <img
                              src={`http://localhost:5000/${product.images[0]}`}
                              alt={product.product}
                            />
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.size}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.category.title}</TableCell>
                          <TableCell>{product.subcategory.title}</TableCell>
                          <TableCell>
                            <button
                              className="prodash-button"
                              onClick={() => getProductById(product._id)}
                            >
                              <img
                                className="prodash-icon"
                                src={edit}
                                alt="#"
                              />
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
      )}
      <div className="forms-section">
      {addMode && (
          <div className="product-form-container">
            <h1>Add Product</h1>
            <form
              className="product-edit-form"
              onSubmit={handleAddSubmit}  
              ref={form}
            >
              <div className="username">
                <label className="label-auth">Product name:</label> <br />
                <input
                  className="product-edit-input"
                  type="text"
                  id="username"
                  placeholder="Product name"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="username">
                <label className="label-auth">Description:</label> <br />
                <textarea
                  className="product-edit-input"
                  type="text"
                  id="username"
                  placeholder="discription"
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="username">
                <label className="label-auth">Category:</label> <br />
                <select
                  id="category"
                  name="categoryTitle"
                  value={product.categoryTitle}
                  onChange={handleInputChange}
                >
                  <option value="">Select a category...</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="username">
                <label className="label-auth">Subcategory:</label> <br />
                <select
                  id="subcategory"
                  name="subcategoryTitle"
                  value={product.subcategoryTitle}
                  onChange={handleInputChange}
                >
                  <option value="">Select a subcategory...</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory.title}>
                      {subcategory.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="username">
                <label className="label-auth">Price:</label> <br />
                <input
                  className="product-edit-input"
                  type="number"
                  id="username"
                  placeholder="Price"
                  name="price"
                  min="0"
                  step=".01"
                  value={product.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="username">
                <label className="label-auth">Discount Percentage:</label>{" "}
                <br />
                <input
                  className="product-edit-input"
                  type="number"
                  id="username"
                  placeholder="Discount Percentage"
                  name="discountPercentage"
                  min="0"
                  max="100"
                  step=".01"
                  value={product.discountPercentage}
                  onChange={handleInputChange}
                />
              </div>
              <div className="username">
                <label className="label-auth">Size:</label> <br />
                <input
                  className="product-edit-input"
                  type="text"
                  id="username"
                  placeholder="Size"
                  name="size"
                  value={product.size}
                  onChange={handleInputChange}
                />
              </div>
             
              <div className="username">
                <label className="label-auth">Uplaod images:</label> <br />
                <input
                  className="product-edit-input"
                  id="username"
                  type="file"
                  name="images"
                  onChange={handleImageChange}
                  multiple
                />
              </div>
              <button className="product-edit-button" type="submit">
                Add Product
              </button>
            </form>
            </div>
         
      )}
        {editMode && (
         <div className="product-form-container">
          <h1>Update Product</h1>
            <form
              className="product-edit-form"
              onSubmit={handleEditSubmit}
              ref={form}
            >
              <div className="username">
                <label className="label-auth">Product name:</label> <br />
                <input
                  className="product-edit-input"
                  type="text"
                  id="username"
                  placeholder="Product name"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="username">
                <label className="label-auth">Description:</label> <br />
                <textarea
                  className="product-edit-input"
                  type="text"
                  id="username"
                  placeholder="discription"
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="username">
                <label className="label-auth">Category:</label> <br />
                <select
                  id="category"
                  name="categoryTitle"
                  value={product.categoryTitle}
                  onChange={handleInputChange}
                >
                  <option value="">Select a category...</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="username">
                <label className="label-auth">Subcategory:</label> <br />
                <select
                  id="subcategory"
                  name="subcategoryTitle"
                  value={product.subcategoryTitle}
                  onChange={handleInputChange}
                >
                  <option value="">Select a subcategory...</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory.title}>
                      {subcategory.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="username">
                <label className="label-auth">Price:</label> <br />
                <input
                  className="product-edit-input"
                  type="number"
                  id="username"
                  placeholder="Price"
                  name="price"
                  min="0"
                  step=".01"
                  value={product.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="username">
                <label className="label-auth">Discount Percentage:</label>{" "}
                <br />
                <input
                  className="product-edit-input"
                  type="number"
                  id="username"
                  placeholder="Discount Percentage"
                  name="discountPercentage"
                  min="0"
                  max="100"
                  step=".01"
                  value={product.discountPercentage}
                  onChange={handleInputChange}
                />
              </div>
              <div className="username">
                <label className="label-auth">Size:</label> <br />
                <input
                  className="product-edit-input"
                  type="text"
                  id="username"
                  placeholder="Size"
                  name="size"
                  value={product.size}
                  onChange={handleInputChange}
                />
              </div>
             
              <div className="username">
                <label className="label-auth">Uplaod images:</label> <br />
                <input
                  className="product-edit-input"
                  id="username"
                  type="file"
                  name="images"
                  onChange={handleImageChange}
                  multiple
                />
              </div>
              <div className="username">
                <label className="label-auth">The main image:</label> <br />
                <input
                  className="product-edit-input"
                  id="username"
                  type="file"
                  name="images"
                  onChange={handleImageChange}
                  multiple
                />
              </div>
             
              <button className="product-edit-button" type="submit">
                Update Product
              </button>
            </form>
         </div>
        )}
      </div>
    </>
  );
}

export default ProductDashboard;

// setTimeout(() => {
//     setLoading(false);
//   }, 2000);

//   {addMode && (
//         <form  className="product-edit-form" ref={form}>
//         <div className="username">
//           <label className="label-auth">Product name:</label> <br />
//           <input

//             className="product-edit-input"
//             type="text"
//             id="username"
//             placeholder="Product name"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//            />
//         </div>
//         <div className="username">
//           <label className="label-auth">Description:</label> <br />
//           <input

//             className="product-edit-input"
//             type="text"
//             id="username"
//             placeholder="discription"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//            />
//         </div>
//         <div className="username">
//           <label className="label-auth">Category:</label> <br />
//           <input

//             className="product-edit-input"
//             type="text"
//             id="username"
//             placeholder="Category name"
//             name="category"
//             value={formData.category.title}
//             onChange={handleChange}
//            />
//         </div>
//         <div className="username">
//           <label className="label-auth">Subcategory:</label> <br />
//           <input

//             className="product-edit-input"
//             type="text"
//             id="username"
//             placeholder="Subcategory name"
//             name="subcategory"
//             value={formData.subcategory.title}
//             onChange={handleChange}
//            />
//         </div>
//         <div className="username">
//           <label className="label-auth">Price:</label> <br />
//           <input

//             className="product-edit-input"
//             type="text"
//             id="username"
//             placeholder="Price"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//            />
//         </div>
//         <div className="username">
//           <label className="label-auth">Discount Percentage:</label> <br />
//           <input

//             className="product-edit-input"
//             type="text"
//             id="username"
//             placeholder="Discount Percentage"
//             name="discountPercentage"
//             value={formData.discountPercentage}
//             onChange={handleChange}
//            />
//         </div>
//         <div className="username">
//           <label className="label-auth">Size:</label> <br />
//           <input

//             className="product-edit-input"
//             type="text"
//             id="username"
//             placeholder="Size"
//             name="size"
//             value={formData.size}
//             onChange={handleChange}
//            />
//         </div>
//         <div className="username">
//           <label className="label-auth">Uplaod images:</label> <br />
//           <input
//           className="product-edit-input"
//           id="username"
//           type="file"
//           name="images"
//           onChange={handleFileInputChange}
//           multiple
//           />
//         </div>
//         <button className="product-edit-button" type="submit">
//           Submit
//         </button>
//       </form>
//                  )}
