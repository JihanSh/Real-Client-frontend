import React from "react";
import "./Product.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ProductCarousel from "../../component/ProductCarousel/ProductCarousel";
import icon from "./images/icons8-right-arrow-32 (1).png";
import { Link } from "react-router-dom";

import ReactLoading from "react-loading";

const Product = () => {
  const productId = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cartStatus, setCartStatus] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${productId.productId}`)
      .then((response) => {
        
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 

  // Fetch and sort the items on mount
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:5000/products");
      const fetchedItems = response.data.sort(
        (a, b) => new Date(b.date_added) - new Date(a.date_added)
      );
      setProducts(fetchedItems.slice(0, 3)); // get the first four items
    }
    fetchData();
  }, []);

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
      {loading ? (
        <ReactLoading
          className="loading-container"
          type="spinningBubbles"
          color="#FF7D00"
          height={200}
          width={100}
        />
      ) : (
        <div className="product">
          <div className="product-section">
            <div className="carousel-product">
              <ProductCarousel
                images={
                  product.images &&
                  product.images.map(
                    (image) => `http://localhost:5000/${image}`
                  )
                }
              />
            </div>
            <div className="info-product">
              <div className="breadcramb">
                <span className="span-product">
                  <Link to="/" className="link-product">
                    Home
                  </Link>
                </span>
                <img src={icon} alt="#" />
                <span className="span-product">
                  <a
                    href={`/category/${product.category._id}`}
                    className="link-product"
                  >
                    Product
                  </a>
                </span>
                <img src={icon} alt="#" />
                <span className="name-h4">{product.name.slice(0, 20)}...</span>
              </div>
              <h1>{product.name}...</h1>
              {product.discountPercentage ? (
                <>
                  <p className="original-price">${product.price}</p>
                  <p className="discounted-price">
                    ${product.discountedPrice} ({product.discountPercentage}%
                    off)
                  </p>
                </>
              ) : (
                <p>${product.price}</p>
              )}
              <button
                className="btn-add"
                size="small"
                onClick={(event) => handleCart(event, product._id)}
              >
                <Link to="/cart" className="link-add">
                  ADD TO CART
                </Link>
              </button>

              <hr className="line-product1" />
              <p className="category-product">
                Categorise: {product.category.title},{" "}
                {product.subcategory.title}
              </p>
              <hr className="line-product2" />
              <p className="des-product">{product.description}</p>
            </div>
          </div>
          <div className="product-section2">
            <div className="description-product">
              <h4>Description:</h4>
              <p>
                {product.description}ljshdfpnvoi ;lskdfjnpaoiecnp woeimjcawoiemc
                oweijcmckjecowemjc weijcopwinec iencpwine euvnpe
                iupeituvneirbcperv psirncpeirtnvpi entpecirnp entvpertnp
                ceitnpenvpetnpeupeivnutpecio mpoeinuvnutpoieetc nirnvierncpeintc
                enrivnpeiorcwo oiermcpwoipeonrcpeior nclweivniuhgoiwvernuhce
                cepiorcnpwoiecn
              </p>
            </div>
            <div className="recent-product-section">
              <h4>
                <span>Latest Drops</span>
              </h4>
              {products.map((each, i) => (
                <React.Fragment key={i}>
                  <div className="recent-product" key={i}>
                    <img
                      className="img-product-section"
                      src={`http://localhost:5000/${each.images[0]}`}
                      alt="#"
                    ></img>
                    <div className="recent-info">
                      <a href={`/product/${each._id}`} className="R">
                        <h6 className="K">{each.name.slice(0, 15)}...</h6>
                      </a>
                      {each.discountPercentage ? (
                        <>
                          <h6 className="original-price2">${each.price}</h6>
                          <h6 className="discounted-price2">
                            ${each.discountedPrice} ({each.discountPercentage}%
                            off)
                          </h6>
                        </>
                      ) : (
                        <h6>${each.price}</h6>
                      )}
                    </div>
                  </div>
                  {i !== each.length - 1 && <hr className="line-product3" />}{" "}
                  {/* Add <hr/> for all items except the last */}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
