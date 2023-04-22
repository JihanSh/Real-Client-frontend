import React from "react";
import "./Home.css";
import "react-use-smooth-scroll/dist/index.css";
import sale from "./images/e20be251-9e01-4175-8cdf-231450c3d9d1.jpeg";
import men from "./images/male-looks-casual-wear-style.jpeg";
import women from "./images/lp-header-m.jpeg";
import child from "./images/istockphoto-674315022-612x612 .jpeg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { HeaderNavbar, MenuBar } from '../../component/Header/HeaderNavbar';
import {Footer} from '../../component/Header/footer/footer';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import icon1 from "./images/icons8-man-60.png";
import icon2 from "./images/icons8-businesswoman-50.png";
import icon3 from "./images/icons8-children-16.png";

const Home = () => {
  const [menubar, setMenuBar] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // add state for totalPages
  const [cartStatus, setCartStatus] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log("jjjjj", currentPage);
    axios
      .get(`http://localhost:5000/products/pag?page=${currentPage}`)
      .then((response) => {
        setProducts(response.data.data);
        setTotalPages(response.data.totalPages); // update totalPages state
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  // Sort products by date_added in descending order
  products.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));

  const handleCart = async (event, productId) => {
    event.preventDefault();
    console.log(productId);
    try {
      const response = await axios.post(
        `http://localhost:5000/cart/643345a83f5903910a71e6d5`,
        {
          productId: productId,
        }
      );
      setCartStatus("sucssful", response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <HeaderNavbar setMenuBar={setMenuBar} menubar={menubar} />
      <MenuBar menubar={menubar} /> 
      <div className="home-section">
        <div className="sale-section">
          <div className="img-sale-section">
            <img src={sale} alt="#" />
          </div>
          <div className="line-sale-section">
            <h2 className="line">Special Sale !!</h2>
            <h2>GET UP TO 20% OFF</h2>
            <Link className="sale-link">SHOP NOW</Link>
          </div>
        </div>
        <h1 className="line-category-section">Categories</h1>
        <div className="list-category-section">
          <Link to="/category" className="link-category">
            <img className="lic1" src={icon1} alt="#" />
            MEN’S WEAR
          </Link>
          <Link to="/category" className="link-category">
            <img className="lic2" src={icon2} alt="#" />
            WOMEN’S WEAR
          </Link>
          <Link to="/category" className="link-category">
            <img className="lic3" src={icon3} alt="#" />
            CHILDREN’S WEAR
          </Link>
        </div>
        <div className="category-section">
          <img src={men} className="img1" alt="#" />
          <img src={women} className="img2" alt="#" />
          <img src={child} className="img3" alt="#" />
        </div>
        <div className="category1-section">
          {categories.map((category, id)=>(
          <button className="category-button"><Link key={id} className="link1-category" to={`/category/${category._id}`}>{category.title}</Link></button>
          ))}
        </div>
        <h1 className="line-latest-section">Latest Drops</h1>
        <div className="products-section">
          {products.map((product, id) => (
            <div className="product-card">
              <Card
                key={id}
                sx={{ maxWidth: 250, border: "solid 1px #0B486A" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="260"
                    image={`http://localhost:5000/${product.images[0]}`}
                    alt="product img"
                  />

                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <CardContent>
                      <Link className="product-link" to={`product/${product._id}`}>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.name.slice(0, 15)}...
                        </Typography>
                      </Link>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb="-20px"
                        fontSize="20px"
                      >
                        {product.price} $
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={(event) => handleCart(event, product._id)}
                      >
                        <Link to="/cart" className="addto-cart">
                          ADD TO CART
                        </Link>
                      </Button>
                    </CardActions>
                  </Box>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </div>
        <Stack spacing={2}>
          <Pagination
            count={totalPages} // pass totalPages as prop
            shape="rounded"
            page={currentPage} // set the current active page
            onChange={(event, value) => setCurrentPage(value)} // update the currentPage when user clicks on a different page
            className="pagination"
          />
        </Stack>
      </div>
      <Footer/>
    </>
  );
};

export default Home;


  /* <Link to="/category" className="img1-category">
<img src={men} alt="#" />
<div className="overlay1">Men</div>
</Link>
<Link to="/category" className="img2-category">
<img src={women} alt="#" />
<div className="overlay2">Women</div>
</Link>
<Link to="/category" className="img3-category">
<img src={child} alt="#" />
<div className="overlay3">Children</div>
</Link> */

