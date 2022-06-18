import React from 'react';
import { Carousel } from 'react-bootstrap';
import men from "../../assets/man.webp";
import watch from "../../assets/watch-lover.webp";
const Slick = () => {
  return (
  <div className ="container-fluid mt-3 w-100">
     <div className="row">
        <div className="col-md-12">
    <Carousel fade>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={men}
        alt="Third slide"
      />
    </Carousel.Item>

    <Carousel.Item>
      <img
        className="d-block w-100"
        src={watch}
        alt="Third slide"
      />
    </Carousel.Item>
  </Carousel>
    </div>
    </div>
      </div>
  );
};

export default Slick;

/* 

*/