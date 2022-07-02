import axios from 'axios';
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/CartConstants";

// Add product
export const addItemToCart = (id, quantity) => async(dispatch, getState) => { 
     const {data} = await axios.get(`https://e-shop-47.herokuapp.com/api/v1/product/${id}`);
     dispatch({
        type:ADD_TO_CART,
        payload:{
            product:data.singleProduct._id,
            title: data.singleProduct.title,
            price: data.singleProduct.price,
            image: data.singleProduct.images[0].url,
            stock: data.singleProduct.stock,
            quantity,
        }
     });
     localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
 }
 

 // Remove Item

 export const removeItemFormCart = (id) => async(dispatch, getState) => { 
     dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
 }

 // SAVE_SHIPPING_INFO

 export const saveShippingInfo = (data) => async(dispatch)=>{
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });
    localStorage.setItem("shippingInfo", JSON.stringify(data));
 }