import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import Button from '@mui/material/Button';
import { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import Newsletter from "../../components/Newsletter/Newsletter";
import ReviewCard from '../../components/Reviews/ReviewCard';
import { addItemToCart } from '../../redux/actions/CartActions';
import { clearErrors, getProductDetails, newReview } from '../../redux/actions/ProductActions';
import { NEW_REVIEW_RESET } from '../../redux/constants/ProductConstants';
import { mobile } from "../../styles/responsive";
import Loader from './../../components/Loader/Loader';
import './ProducDetails.css';
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Buttons = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const ProductDetails = ({}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  let {id} = useParams();
  const [open, setOpen] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState("");

  const [quantity, setQuantity] = useState(1);

  const {products,loading, error,rating} = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector((state) => state.newReview);
  
  const options = {
    size: "large",
    value: products.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () =>{
     if(products.stock<=quantity) return;
     const qty = quantity + 1; 
     setQuantity(qty);
  }
  const decreaseQuantity = () =>{
    if(quantity <= 1) return;
    const qty = quantity - 1; 
    setQuantity(qty);
  }

  const addToCartHandler = () =>{
     dispatch(addItemToCart(id,quantity));
     alert.success("Item Add successfully");
  }

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", ratings);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };


  useEffect(() =>{
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
    window.scrollTo(0, 0);
  },[dispatch,id,alert,error,reviewError,success])

  return (
    <Fragment>
      { loading ? <Loader/>:  <Fragment>
          <NavBar></NavBar>
          <Container>
            <Wrapper>
              <ImgContainer>
                  <Carousel>
                  {products.images &&
                   products.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}                 
                  </Carousel>
              </ImgContainer>
              <InfoContainer>
                <Title>{products.title}</Title>
                <Desc>
                  {products.desc}
                </Desc>
               { products && <Price>TK : {products.price} </Price> }
                <div className="rating d-flex">
                   <div>
                       <Rating {...options} /> 
                   </div>
                   <div className='mt-3 mx-auto'>
                     {products && <span> Reviews:{ products.numOfReviews}</span>}
                   </div>
                   <button onClick={submitReviewToggle} className="submitReview">
                    Submit Review
                   </button>
                </div>
    
                <div>
                  {
                   products && <p>
                    Status:
                    <b className={products.stock < 1 ? "text-danger" : "text-success"}>
                      {products.stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                   </p>
                  }
                </div>
    
                <FilterContainer>
                  <Filter>
                    <FilterTitle>Color</FilterTitle>
                    <FilterColor color="black" />
                    <FilterColor color="darkblue" />
                    <FilterColor color="gray" />
                  </Filter>
                </FilterContainer>
                <AddContainer>
                  <AmountContainer>
                    <RemoveCircleOutlineIcon role="button" onClick={decreaseQuantity}/>
                      <Amount>{quantity}</Amount>
                    <AddCircleOutlineIcon role="button" onClick={increaseQuantity}/>
                  </AmountContainer>
                  <Buttons
                   disabled={products.stock < 1 ? true: false }
                   onClick={addToCartHandler}
                   >ADD TO CART</Buttons>
                </AddContainer>
              </InfoContainer>
            </Wrapper>
             <div className ='Review-section'>
                <h3 className="reviewsHeading">REVIEWS</h3>
                <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
              >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
              <div className ='ratings'>
                <Rating
                  onChange={(e) => setRatings(e.target.value)}
                  value={ratings}
                  name="size-large" 
                  size="large"
                />
              </div>
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary" variant="contained">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary" variant="contained">
                Submit
              </Button>
            </DialogActions>

            </Dialog>
            {products.reviews && products.reviews[0] ? (
            <div className="reviews">
              {products.reviews &&
                products.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
             </div>
            <Newsletter />
          </Container>
          <hr />
          <div className="container offset-sm-1">
            <Footer />
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

export default ProductDetails;


/*
product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))

*/