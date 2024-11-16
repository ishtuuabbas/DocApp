
import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image6 from "../../../assets/bg/2.jpg"
import image2 from "../../../assets/bg/6.jpg"
import image3 from "../../../assets/bg/4.jpg"
import image4 from "../../../assets/bg/5.jpg"
import image5 from "../../../assets/bg/8.jpg"
import image7 from "../../../assets/bg/7.jpg"
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const sliderImages = [
    // { id: 1, image: image1, alt: "Image 1" },
    { id: 4, image: image6, alt: "Image 6" },
    { id: 2, image: image2, alt: "Image 2" },
    { id: 3, image: image3, alt: "Image 3" },
    { id: 4, image: image4, alt: "Image 4" },
    { id: 5, image: image5, alt: "Image 5" },
    { id: 5, image: image7, alt: "Image 7" },

  ];
  
  const HeroSection = () => {
  return (
    <section id="hero" className="d-flex align-items-center">
        <img src='../../../assets/Images/bg/bg3.jpg'  alt="altimage"/>
      <div className="slider-background">
        <Slider {...sliderSettings}>
          {sliderImages.map((slide) => (
            <div key={slide.id}>
              <img src={slide.image} alt={slide.alt} className="img-fluid" />
            </div>
          ))}
        </Slider>
      </div>
      <div className="container">
        <div>
          <large>TOTAL HEALTH CARE SOLUTION</large>
          <h1>Your Most Trusted <br />Health Partner</h1>
          {/* <small>A trusted health partner for clinic digitization goes beyond simply offering software solutions. They act as a comprehensive guide, understanding the unique needs of clinic and providing solutions that streamline operations, enhance patient care, and ensure data security. This partner should possess a proven track record in the healthcare industry, offering user-friendly technology that integrates seamlessly with existing workflows.</small> */}
       
        </div>
        <div className="d-flex justify-content-start gap-2">
          <Link to={'/appointment'} className="btn-get-started scrollto">Make an Appointment</Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
