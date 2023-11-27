import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({children}) => {
    const { user, loading } = UseAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
  
    if (loading || isAdminLoading) {
      return (
        <div className="flex justify-center items-center text-center mt-56">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      );
    }
  
    if (user || isAdmin) {
      return children;
    }
    return <Navigate state={{ from: location }} to="/" replace></Navigate>;
  };

export default AdminRoute;