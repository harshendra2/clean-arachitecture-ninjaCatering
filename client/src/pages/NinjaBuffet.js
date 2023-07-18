import React, { useRef } from "react";
import Header from "../components/Header";
import Carousel from "react-bootstrap/Carousel";
import "../styles/NinjaBox.css";
import Ninjaboxspecial from "../components/ninjaboxspecial";
import Ninjaboxpackage from "../components/Ninjaboxpackage";
import Footer from "../components/footer";
import Ninjabuffetpackage from "../components/NinjaBuffetpackage";

function NinjaBuffet() {
  return (
    <>
      <Header />

      <div className="container">
  <div className="carousel-container">
    <Carousel interval={3000}>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="https://new.caterninja.com/ninja-buffy/header/Frame%20771.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="https://new.caterninja.com/ninja-buffy/header/Frame%20769.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="https://new.caterninja.com/ninja-buffy/header/Frame%20770.png"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="https://new.caterninja.com/ninja-box/header/Frame%20763.png"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="https://new.caterninja.com/ninja-box/header/Frame%20761.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  </div>
  <div className="NinjaBox d-none d-md-block">
    <h2 className="ninjaheadding">
      <span className="ninjaheader">Cater</span>Ninja
    </h2>
    <h2 className="ninjaheadding2">
      Ninja<span className="ninjaheader2">Buffet</span>
    </h2>
    <img
      className="ninjaboximage"
      src="https://new.caterninja.com/ninja-buffy/header/buffetNinjaLogo.png"
      alt="NinjaBox"
    />
    <button className="ninjaboxbtn">Select Packages</button>
  </div>
</div>


      <Ninjaboxspecial />
      <Ninjabuffetpackage />
      <Footer />
    </>
  );
}

export default NinjaBuffet;
