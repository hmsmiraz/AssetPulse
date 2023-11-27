import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAsset = () => {
    const axiosPublic = useAxiosPublic();
    const {data: assets = [], isPending: loading, refetch } = useQuery({
      queryKey: ["assets"],
      queryFn: async() =>{
        const res = await axiosPublic.get('/assets');
        // console.log(assets);
        return res.data;
      }
    })
    return [assets, loading, refetch];
};

export default useAsset;