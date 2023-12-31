
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
    const axiosPublic = useAxiosPublic();
    const {refetch, data: users = [], isPending: loading } = useQuery({
      queryKey: ["users"],
      queryFn: async() =>{
        const res = await axiosPublic.get('/users');
        // console.log(assets);
        return res.data;
      }
    })
    return [users, loading, refetch];
};

export default useUsers;