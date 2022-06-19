/*import React from 'react';
import headPhone from "../../assets/headphone.webp";
import Laptop from "../../assets/laptop.jpg";
import smartphone from "../../assets/smartphone.jpg";
import CardProduct from './CardProduct';
const Product = () => {

    let myProduct = [
            {
                id: 1,
            name : 'Laptops',
            img: Laptop,
            },
            {
                id: 2,
                name : 'Headphones',
                img:headPhone
            },
            {
                id: 3,
                    name : 'Smartphones',
                    img: smartphone
            }
    ]

    return (
        <div className ="container mt-5">
            <div className="row">
              {
                myProduct.map(product => 
                    <CardProduct key={product.id} product ={product}></CardProduct>
                )
                }
            </div>
          
        </div>
    );
};

export default Product;
*/

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from 'react';
import images from "../../helpers/images";
import './NewProduct.css';
const NewProduct = () => {

    console.log(images);
    const [width, setWidth] = useState(0)
    const carousel = useRef()
     
    useEffect(() =>{
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    },[])


    return (
        <motion.div ref={carousel} className='carousel'>
             <motion.h5 className='text-center' dragConstraints={{right:0, left: -width-10}} >New Product </motion.h5>
             <motion.div 
              animate={{ pathLength: 1 }}
              drag='x' 
              dragConstraints={{right:0, left: -width}} 
              className="inner-carousel" 
              whileTap={"grabbing"}
              transition={{ duration: 2, type: "tween" }}
             >
               {
                images.map((image,index) =>{
                    return (
                        <motion.div key={index} className='item'>
                           <img src={image} alt="" />
                        </motion.div>

                    );
                })
               }
             </motion.div>
        </motion.div>
    );
};

export default NewProduct;
