import React from 'react';
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