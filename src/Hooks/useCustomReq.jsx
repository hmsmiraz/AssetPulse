import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCustomReq = () => {
    const axiosPublic = useAxiosPublic();
    const {data: customReq = [], isPending: loading, refetch } = useQuery({
      queryKey: ["customReq"],
      queryFn: async() =>{
        const res = await axiosPublic.get('/customReq');
        // console.log(assets);
        return res.data;
      }
    })
    return [customReq, loading, refetch];
};

export default useCustomReq;