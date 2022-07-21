import { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../Loader/Loader";
import { clearErrors, getProduct } from "./../../redux/actions/ProductActions";
import Product from "./Product.js";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ price, cate, rating }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, products, productsCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, cate, rating));
  }, [dispatch, alert, keyword, currentPage, price, cate, rating, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div>
            <h1 className="text-center">Best Seller Products</h1>
            <Container>
              {products &&
                products.map((product, index) => {
                  return <Product key={index} product={product}></Product>;
                })}
            </Container>
          </div>
          {
            <div className="paginationBox mb-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          }
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;

/*

*/
