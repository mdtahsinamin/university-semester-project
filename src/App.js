import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart/Cart";
import ConfirmOrder from "./components/Order/ConfirmOrder";
import AdminRoute from "./components/PrivateRoute/AdminRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Search from './components/Search/Search';
import Success from './components/Success/Success';
import UserOptions from "./components/UserOptions/UserOptions";
import WatchList from "./components/WatchList/WatchList";
import AdminProductList from './pages/Admin/AdminProductList';
import Dashboard from "./pages/Admin/DashBoard";
import NewProduct from './pages/Admin/NewProduct';
import OrderList from './pages/Admin/OrderList';
import ProcessOrder from './pages/Admin/ProcessOrder';
import ProductReviews from './pages/Admin/ProductReviews';
import UpdateProduct from './pages/Admin/UpdateProduct';
import UpdateUser from './pages/Admin/UpdateUser';
import UserList from './pages/Admin/UserList';
import ForgetPassword from "./pages/Forget-Password/ForgetPassword";
import NewPassword from "./pages/Forget-Password/NewPassword";
import UpdatePassword from "./pages/Forget-Password/UpdatePassword";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MyOrders from './pages/MyOrders/MyOrders';
import NotFound from './pages/NotFound/NotFound';
import OrderDetails from './pages/OrderDetails/OrderDetails';
import Payment from "./pages/Payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductList from "./pages/ProductList/ProductList";
import Register from './pages/Register/Register';
import Shipping from "./pages/Shipping/Shipping";
import ShopLocation from "./pages/ShopLocation/ShopLocation";
import TrackOrder from "./pages/TrackOrder/TrackOrder";
import UpdateProfile from "./pages/Update-Profile/UpdateProfile";
import UserProfile from "./pages/UserProfile/UserProfile";
import { loadUser } from "./redux/actions/UserActions";
import { store } from './redux/store';
function App() {
   const [stripeApiKey, setStripeApiKey] = useState('');

   async function getStripApiKey() {
      const {data} =  await axios.get('/api/v1/payment/stripe-api-key',{ withCredentials: true })
      setStripeApiKey(data.stripeApiKey)
   }

   useEffect(()=>{
    store.dispatch(loadUser());
    getStripApiKey();
   },[])

   const { isAuthenticated, user } = useSelector((state) => state.user);
   
  return (
      <BrowserRouter>
        {isAuthenticated && <UserOptions user={user} />}
         <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route index element={<Home />} />
            <Route path ='/all-products' element={<ProductList/>}></Route>
            <Route path="/shop-location" element={<ShopLocation/>}></Route>
            <Route path="/track-order" element={<TrackOrder/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path ='/cart' element={<Cart/>}></Route>
            <Route path ='/search' element={<Search/>}></Route>
            <Route path ='/watch-list' element={<WatchList/>}></Route>
            <Route path ='/product-details/:id' element={<ProductDetails/>}></Route>
            <Route path ='/product/:keyword' element={<ProductList/>}></Route>
            <Route path ='/forget-password' element={<ForgetPassword/>}></Route>
            <Route path ='/password/reset/:token' element={<NewPassword/>}></Route>
            <Route 
             path ='/shipping-order/confirm'
             element={
             <PrivateRoute>
                <ConfirmOrder/>
             </PrivateRoute>
             } 
            ></Route>

            <Route 
             path ='/process/payment'
             element={
               stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}> 
               <PrivateRoute>
                <Payment/>
              </PrivateRoute>
               </Elements>}>
              </Route>
            <Route 
             path ='/success'
             element={
             <PrivateRoute>
                <Success/>
             </PrivateRoute>
             } 
            ></Route>

           <Route 
             path ='/order/:id'
             element={
             <PrivateRoute>
                <OrderDetails/>
             </PrivateRoute>
             } 
            ></Route>

            <Route
            path="/user-profile"
            element={
              <PrivateRoute>
                <UserProfile/>
              </PrivateRoute>
            }
           />

          <Route
            path="/my-orders"
            element={
              <PrivateRoute>
                <MyOrders/>
              </PrivateRoute>
            }
           />

           <Route
            path="/update/profile"
            element={
              <PrivateRoute>
                 <UpdateProfile/>
              </PrivateRoute>
            }
           />

            <Route 
             path ='/password/update'
             element={
             <PrivateRoute>
                <UpdatePassword/>
             </PrivateRoute>
             } 
            ></Route>

           <Route 
             path ='/shipping'
             element={
             <PrivateRoute>
                <Shipping/>
             </PrivateRoute>
             } 
            ></Route>

           <Route 
             path ='/admin/dashboard'
             element={
             <AdminRoute>
                <Dashboard/>
             </AdminRoute>
             } 
            ></Route>
             
             <Route 
             path ='/admin/products'
             element={
             <AdminRoute>
                <AdminProductList/>
             </AdminRoute>
             } 
            ></Route>

            <Route 
             path ='/admin/product'
             element={
             <AdminRoute>
                <NewProduct/>
             </AdminRoute>
             } 
            ></Route>

           <Route 
             path ='/admin/product/:id'
             element={
             <AdminRoute>
                <UpdateProduct/>
             </AdminRoute>
             } 
            ></Route>

           <Route 
             path ='/admin/orders'
             element={
             <AdminRoute>
                <OrderList/>
             </AdminRoute>
             } 
            ></Route>

            <Route 
             path ='/admin/order/:id'
             element={
             <AdminRoute>
                <ProcessOrder/>
             </AdminRoute>
             } 
            ></Route>

           <Route 
             path ='/admin/users'
             element={
             <AdminRoute>
                <UserList/>
             </AdminRoute>
             } 
            ></Route>

           <Route 
             path ='/admin/user/:id'
             element={
             <AdminRoute>
                <UpdateUser/>
             </AdminRoute>
             } 
            ></Route>

          <Route 
             path ='/admin/reviews'
             element={
             <AdminRoute>
                <ProductReviews/>
             </AdminRoute>
             } 
            ></Route>


          <Route path="*" element={<NotFound />} />
         </Routes>
      </BrowserRouter>
  );
}

export default App;
 