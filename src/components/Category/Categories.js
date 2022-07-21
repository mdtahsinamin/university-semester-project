import styled from "styled-components";
import { categories } from "../../data.js";
import { mobile } from "../../styles/responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  return (
    <div>
      <h1 className="text-center">Product Categories</h1>
      <Container>
        {categories.map((category) => {
          return <CategoryItem category={category} key={category.id} />;
        })}
      </Container>
    </div>
  );
};

export default Categories;
