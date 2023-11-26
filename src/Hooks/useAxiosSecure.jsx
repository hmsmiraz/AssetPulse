import axios from "axios";
// import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
});
const useAxiosSecure = () => {
    // const navigate = useNavigate();
    const { logOut } = UseAuth();
    axiosSecure.interceptors.request.use(function (config){
        
        const token = localStorage.getItem('Access-Token')
        // console.log("interceptors", token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error){
        return Promise.reject(error);
    });
    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, async (error)=>{
        const status = error?.response?.status;
        if(status === 401 || status === 403){
            await logOut();
            // navigate('/login');
        }
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;