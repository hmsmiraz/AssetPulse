import UseAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const { user, loading } =UseAuth();
    const location = useLocation();
  
    if (loading) {
      return (
        <div className="flex justify-center items-center text-center mt-56">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      );
    }
  
    if (user) {
      return children;
    }
    return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
  };

export default PrivateRoutes;