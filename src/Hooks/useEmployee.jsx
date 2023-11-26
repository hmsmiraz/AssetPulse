import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";


const useEmployee = () => {
    const { user, loading } = UseAuth();
      const axiosSecure = useAxiosSecure();
      const { data: isEmployee, isPending: isEmployeeLoading } = useQuery({
        queryKey: [user?.email, "isEmployee"],
        enabled: !loading,
        queryFn: async () => {
          const res = await axiosSecure.get(`/users/employee/${user.email}`);
          // console.log(res.data);
          return res.data?.employee;
        },
      });
      return [isEmployee, isEmployeeLoading];
    };

export default useEmployee;