import React from "react";
import "./Product.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ProductCarousel from "../../component/ProductCarousel/ProductCarousel";
import icon from "./images/icons8-right-arrow-32 (1).png";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const productId = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recent, setRecent] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    console.log(productId);
    axios
      .get(`http://localhost:5000/products/${productId.productId}`)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.images[0]);
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);
  console.log(products);
  console.log(`http://localhost:5000/${products.images}`);

  // Fetch and sort the items on mount
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:5000/products");
      const fetchedItems = response.data.sort(
        (a, b) => new Date(b.date_added) - new Date(a.date_added)
      );
      setRecent(fetchedItems.slice(0, 3)); // get the first four items
    }
    fetchData();
  }, []);


  function handleClick(productId) {
   
    navigate.push(`/product/${productId}`);
  }

  return (
    <>
      {loading ? (
        <h2>loading</h2>
      ) : (
        <div className="product">
          <div className="product-section">
            <div className="carousel-product">
              <ProductCarousel
                images={
                  products.images &&
                  products.images.map(
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
                  <Link to="/category" className="link-product">
                    Product
                  </Link>
                </span>
                <img src={icon} alt="#" />
                <span className="name-h4">{products.name.slice(0, 20)}...</span>
              </div>
              <h1>{products.name}...</h1>
              {products.discountPercentage ? (
                <>
                  <p className="original-price">${products.price}</p>
                  <p className="discounted-price">
                    ${products.discountedPrice} ({products.discountPercentage}%
                    off)
                  </p>
                </>
              ) : (
                <p>${products.price}</p>
              )}
              <Link className="link-add">ADD TO CART</Link>

              <hr className="line-product1" />
              <p className="category-product">
                Categorise: {products.category.title},{" "}
                {products.subcategory.title}
              </p>
              <hr className="line-product2" />
              <p className="des-product">{products.description}</p>
            </div>
          </div>
          <div className="product-section2">
            <div className="description-product">
              <h4>Description:</h4>
              <p>
                {products.description}ljshdfpnvoi ;lskdfjnpaoiecnp
                woeimjcawoiemc oweijcmckjecowemjc weijcopwinec iencpwine euvnpe
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
              {recent.map((item, i) => (
                <React.Fragment key={i}>
                  <div className="recent-product">
                    <img
                      className="img-product-section"
                      src={`http://localhost:5000/${item.images[0]}`}
                      alt="#"
                    ></img>
                    <div className="recent-info">
                      <Link  onClick={() => handleClick(item._id)} className="R"><h6 className="K">{item.name.slice(0, 15)}...</h6></Link>
                      {item.discountPercentage ? (
                <>
                  <h6 className="original-price2">${item.price}</h6>
                  <h6 className="discounted-price2">
                    ${products.discountedPrice} ({item.discountPercentage}%
                    off)
                  </h6>
                </>
              ) : (
                <h6>${item.price}</h6>
              )}
                    </div>
                  </div>
                  {i !== recent.length - 1 && <hr className="line-product3" />}{" "}
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
