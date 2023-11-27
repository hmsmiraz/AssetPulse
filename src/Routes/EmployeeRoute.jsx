import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import useEmployee from "../Hooks/useEmployee";

const EmployeeRoute = ({children}) => {
    const { user, loading } = UseAuth();
    const [isEmployee,isEmployeeLoading] = useEmployee();
    const location = useLocation();
  
    if (loading || isEmployeeLoading) {
      return (
        <div className="flex justify-center items-center text-center mt-56">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      );
    }
  
    if (user || isEmployee) {
      return children;
    }
    return <Navigate state={{ from: location }} to="/" replace></Navigate>;
  };

export default EmployeeRoute;