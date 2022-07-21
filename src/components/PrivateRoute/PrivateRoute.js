import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
