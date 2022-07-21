import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./Reducers/CartReducers";
import {
     allOrdersReducer,
     myOrderReducer,
     newOrderReducer,
     orderDetailsReducer,
     orderReducer
} from "./Reducers/OrderReducers";
import {
     newProductReducer,
     newReviewReducer,
     productDetailsReducer,
     productReducer,
     productReviewsReducer,
     productsReducer,
     reviewReducer
} from "./Reducers/ProductReducers";
import {
     allUsersReducer,
     forgotPasswordReducer,
     profileReducer,
     userDetailsReducer,
     userReducers
} from "./Reducers/UserReducers";

const reducers = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducers,
  profile: profileReducer,
  forgetPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {}
  }
};

const middleware = [thunk];

export const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

