import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAssetReq = () => {
    const axiosPublic = useAxiosPublic();
    const {data: assetsReq = [], isPending: loading, refetch } = useQuery({
      queryKey: ["assetsReq"],
      queryFn: async() =>{
        const res = await axiosPublic.get('/assetReq');
        // console.log(assets);
        return res.data;
      }
    })
    return [assetsReq, loading, refetch];
};
export default useAssetReq;