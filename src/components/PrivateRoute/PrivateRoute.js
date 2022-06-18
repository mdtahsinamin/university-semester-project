import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { EshopUser } from "../../App";
import useDecodeToken from "../../hooks/useDecodeToken";
const PrivateRoute = ({children}) => {
  
  const [loginUser , setLoginUser] = useContext(EshopUser)

    const location = useLocation();

    const newUser = useDecodeToken();
   
    if(newUser){
      loginUser['user'] = {
        ...loginUser['user'],
        ...newUser
      }
    setLoginUser(loginUser);
    }
    
    
    const isLoggedIn = () =>{
       const token = sessionStorage.getItem('accessToken');
        if(!token){
         return false;
        }
       const decodedToken = jwt_decode(token);

       const currentTime = new Date().getTime() / 1000;

       const isValid = decodedToken.exp > currentTime

       if(!isValid){
         sessionStorage.removeItem('accessToken')
       }
 
       return (isValid);
     }
     
    return (isLoggedIn()) ?  children : <Navigate to="/login" state={{ from: location }} replace/>;
};

export default PrivateRoute;

  