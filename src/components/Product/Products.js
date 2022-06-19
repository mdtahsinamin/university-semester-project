import styled from "styled-components";
import { popularProducts } from "../../data.js";
import Product from './Product.js';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {
    return (
        <div>
            <h1 className="text-center">Best Seller Products</h1>
            <Container>
             {
                popularProducts.map(product =>{
                    return (
                        <Product key ={product.id} product={product}></Product>
                    )
                })
             }
            </Container>
        </div>
    );
};

export default Products;