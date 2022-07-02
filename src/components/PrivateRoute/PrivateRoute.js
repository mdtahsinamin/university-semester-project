import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
const PrivateRoute = ({children}) => {
  
    const { user, loading, error, isAuthenticated } = useSelector((state) => state.user);
    const location = useLocation();

    return (isAuthenticated) ?  children : <Navigate to="/login" state={{ from: location }} replace/>;
};

export default PrivateRoute;

/*
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

*/
  