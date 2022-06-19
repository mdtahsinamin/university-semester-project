import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart/Cart";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import WatchList from "./components/WatchList/WatchList";
import ForgetPassword from './pages/Forget-Password/ForgetPassword';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from './pages/NotFound/NotFound';
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductList from "./pages/ProductList/ProductList";
import Register from './pages/Register/Register';
import ShopLocation from "./pages/ShopLocation/ShopLocation";
import TrackOrder from "./pages/TrackOrder/TrackOrder";
import UserProfile from "./pages/UserProfile/UserProfile";
export const EshopUser = createContext();

function App() {
   const [loginUser , setLoginUser] = useState({
      user:{}
   });

  return (
    <EshopUser.Provider value={[loginUser, setLoginUser]}>
        <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route index element={<Home />} />
            <Route path="/shop-location" element={<ShopLocation/>}></Route>
            <Route path="/track-order" element={<TrackOrder/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path ='/cart' element={<Cart/>}></Route>
            <Route path ='/watch-list' element={<WatchList/>}></Route>
            <Route path ='/forget-password' element={<ForgetPassword/>}></Route>
            <Route path ='/all-products' element={<ProductList/>}></Route>
            <Route path ='/product-details/:id' element={<ProductDetails/>}></Route>
            <Route
            path="/user-profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
           />
            <Route path="*" element={<NotFound />} />
         </Routes>
        </BrowserRouter>
    </EshopUser.Provider>
  );
}

export default App;
