import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./categorycarousel.css";

const TitleCarousel = () => {
    const [subcategory, setSubcategory] = useState([]);
    useEffect(() => {
        const fetchSubcategory = async () => {
          try {
            const response = await fetch('http://localhost:5000/subcategories');
            const data = await response.json();
            setSubcategory(data);
          } catch (err) {
            console.log(err.message);
          }
        };
    
        fetchSubcategory();
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

  return (
    <Slider {...settings}>
      {subcategory.map((item) => (
        <div key={item._id}>
          <button className="title-carousel">{item.title}</button>
        </div>

      ))}
    </Slider>
  );
};

export default TitleCarousel;