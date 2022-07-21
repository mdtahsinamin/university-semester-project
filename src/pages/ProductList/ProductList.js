import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import { mobile } from "../../styles/responsive";
import Newsletter from "./../../components/Newsletter/Newsletter";
import Products from "./../../components/Product/Products";
import "./ProductList.css";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const Catagories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
  "Fahsion"
];

const ProductList = () => {
  const [price, setPrice] = useState([0, 25000]);
  const [cate, setCate] = useState("");
  const [rating, setRating] = useState(0);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const ratingHandler = (event, newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <Container>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <h5>Price : </h5>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <h5>Catagories : </h5>
            <ul className="catagoriesBox">
              {Catagories.map((category, index) => {
                return (
                  <li
                    className="category-link"
                    key={index}
                    onClick={() => {
                      setCate(category);
                    }}>
                    {category}
                  </li>
                );
              })}
            </ul>
            <fieldset>
              <h5>Rating:</h5>
              <Slider
                value={rating}
                onChange={ratingHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={5}
              />
            </fieldset>
          </Filter>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select>
              <Option selected>Price (asc)</Option>
              <Option>Price (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products price={price} cate={cate} rating={rating} />
      </Container>
      <Newsletter />
      <div className="container offset-sm-1">
        <Footer />
      </div>
    </div>
  );
};

export default ProductList;
