import { Rating } from '@mui/material';
import { BsSearch } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import "./Product.css";
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  border-radius: 1rem;

  &:hover ${Info} {
    opacity: 1;
    border-radius: 1rem;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ product }) => {
  const option = {
    size: "small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const {_id} = product

  return (
    <div>
      <Link to={`/product-details/${_id}`}>
      <Container>
        <Circle />
        <Image src={product.images[0].url}  alt={product.title} />
        <Info>
          <Icon>
            <MdAddShoppingCart />
          </Icon>
          <Icon>
            <BsSearch />
          </Icon>
          <Icon>
            <FiHeart />
          </Icon>
        </Info>
        <Info>
          <div className="product-info">
            <h6 className="text-white mt-3">{product.title}</h6>
            <h6 className="text-warning">Tk : {product.price}</h6>
            <div className="rating">
             <Rating {...option} /> <br/>
             <span>Reviews : {product.numOfReviews}</span>
            </div>
          </div>
        </Info>
      </Container>
    </Link>
    </div>
  );
};

export default Product;
