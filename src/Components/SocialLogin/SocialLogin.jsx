import { useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const SocialLogin = () => {
    const { googleSignIn } = UseAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    const handleGoogleSignIn = ()=>{
        googleSignIn()
        .then(res=>{
            console.log(res.user);
            const userInfo = {
              email: res.user?.email,
              name: res.user?.displayName,
              role: "Employee",
              image: res.user?.photoURL,
          }
          axiosPublic.post('/users', userInfo)
          .then(res=>{
              console.log(res.data);
              navigate('/')
          })
        })
        .then(err=>{
            console.log(err)
        })
    }
    return (
        <div className="my-2">
        <div className="divider"></div>
      <div className="flex justify-center items-center">
        <button onClick={handleGoogleSignIn} className="btn rounded-lg  bg-blue-300">
          <FaGoogle></FaGoogle>
          Google
        </button>
      </div>
    </div>
    );
};

export default SocialLogin;