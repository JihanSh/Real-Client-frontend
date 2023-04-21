import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./categorycarousel.css";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const TitleCarousel = () => {
  const [title, setTitle] = useState([]);
  const [product, setProduct] = useState([]);
  const [subcategoryId, setSubcategoryId] = useState(null);
  const [cartStatus, setCartStatus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // add state for totalPages
  const [searchTerm, setSearchTerm] = useState("");

  const categoryId = useParams();
  const userId = sessionStorage.getItem("Id");

  // fetch subcategory titles
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/subcategories/list/${categoryId.categoryId}`
        );
        const data = await response.json();
        setTitle(data.subcategories);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchTitle();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    cssEase: "linear",
  };

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/products/list2/${categoryId.categoryId}`
        );
        const data = await response.json();
        setProduct(data);
        setTotalPages(data.totalPages); // update totalPages state
      } catch (err) {
        console.log(err.message);
      }
    };
    console.log(categoryId);
    fetchProducts();
  }, []);

  const handleSubcategoryClick = (subcategoryId) => {
    setSubcategoryId(subcategoryId);
  };

  // fetch products by subcategories
  useEffect(() => {
    const fetchProductsBySubcategory = async (subcategoryId) => {
      try {
        const response = await fetch(
          `http://localhost:5000/products/list1/${subcategoryId}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    if (subcategoryId) {
      fetchProductsBySubcategory(subcategoryId);
    } else {
      const fetchProducts = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/products/list2/${categoryId.categoryId}`
          );
          const data = await response.json();
          setProduct(data);
          setTotalPages(data.totalPages);
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchProducts();
    }
  }, [subcategoryId, currentPage]);

  // product.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));

  // handle the add product to cart
  const handleCart = async (event, productId) => {
    event.preventDefault();
    console.log(productId);
    if (userId) {
      try {
        const url = `http://localhost:5000/cart/${userId}`;
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            productId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCartStatus(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      const result = await Swal.fire({
        title: "You need to be logged in to add items to your cart",
        showCancelButton: true,
        confirmButtonText: "Log in",
        customClass: {
          popup: "custom-style",
          title: "custom-style",
          confirmButton: "custom-style",
        },
      });
      if (result.isConfirmed) {
        window.location.href = "/login";
      }
    }
  };
  return (
    <>
      {/* Search bar */}
      <div className="category-searchbar">
        <input
          type="text"
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search products..."
        />
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <Slider {...settings} className="Slider">
        {title.map((item) => (
          <div key={item._id}>
            <button
              className="title-carousel"
              onClick={() => handleSubcategoryClick(item._id)}
            >
              {item.title}
            </button>
          </div>
        ))}
      </Slider>
      <div className="slider-responsive">
        {title.map((item) => (
          <div key={item._id}>
            <button
              className="slider-responsive-title-carousel"
              onClick={() => handleSubcategoryClick(item._id)}
            >
              {item.title}
            </button>
          </div>
        ))}
      </div>
      <div className="products-section-category">
        {product
          .filter((item) => {
            if (searchTerm === "") {
              return item;
            } else if (
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return item;
            }
          })
          .map((product, id) => (
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
                      <a
                        className="product-link"
                        href={`/product/${product._id}`}
                      >
                        <Typography gutterBottom variant="h5" component="div">
                          {product.name.slice(0, 15)}...
                        </Typography>
                      </a>
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
                        className="addto-cart"
                      >
                        ADD TO CART
                      </Button>
                    </CardActions>
                  </Box>
                </CardActionArea>
              </Card>
            </div>
          ))}
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
    </>
  );
};

export default TitleCarousel;
