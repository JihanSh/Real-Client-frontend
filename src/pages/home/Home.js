import React from "react";
import "./Home.css";
import styled from "@emotion/styled";
import { UseEffectScroll } from "react-use-smooth-scroll";
import "react-use-smooth-scroll/dist/index.css";
import sale from "./images/e20be251-9e01-4175-8cdf-231450c3d9d1.jpeg";
import men from "./images/male-looks-casual-wear-style.jpeg";
import women from "./images/lp-header-m.jpeg";
import child from "./images/istockphoto-674315022-612x612 .jpeg";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";


const Home = () => {

const [products, setProducts] = useState([]);
  
useEffect(() => {
  axios
    .get(`http://localhost:5000/products`)
    .then((response) => {
      setProducts(response.data);
      console.log(response.data);

    })
    .catch((error) => {
      console.log(error);
    });
}, []);


  return (
    <>
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
        <div className="category-section">
          <Link to="/category" className="img1-category">
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
          </Link>
        </div>
        <h1 className="line-latest-section">Latest Drops</h1>
        <div className="products-section">
            {products.map((product, id)=>(
          <div className="product-card">
            <Card key={id} sx={{ maxWidth: 250,
            border:"solid 1px #0B486A"}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="260"
                  image={`http://localhost:5000/${product.images[0]}`}
                  alt="product img"
                />
               
                <Box display="flex" flexDirection="column" alignItems="center">
                  <CardContent>
                    <Link className="product-link" to="/product">
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name}
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
                    <Button size="small">ADD TO CART</Button>
                  </CardActions>
                </Box>
              </CardActionArea>
            </Card>
          </div>
            ))}
         
        </div>
      </div>
    </>
  );
};

export default Home;
