import { Carousel } from 'react-bootstrap';
import men from "../../assets/man.webp";
import watch from "../../assets/watch-lover.webp";
import './Slider.css';
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
      <div className="some-info">
           <h3 className='beats-solo'>Fashion</h3>
           <h1 className='container-h1'>Men Fashion</h1>
           <button>SHOP NOW</button>
      </div>
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