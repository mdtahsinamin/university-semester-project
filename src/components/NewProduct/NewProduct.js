import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import images from "../../helpers/images";
import "./NewProduct.css";
const NewProduct = () => {
  console.log(images);
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <motion.div ref={carousel} className="carousel">
      <motion.h5 className="text-center" dragConstraints={{ right: 0, left: -width - 10 }}>
        New Product{" "}
      </motion.h5>
      <motion.div
        animate={{ pathLength: 1 }}
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className="inner-carousel"
        whileTap={"grabbing"}
        transition={{ duration: 2, type: "tween" }}>
        {images.map((image, index) => {
          return (
            <motion.div key={index} className="item">
              <img src={image} alt="" />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default NewProduct;
