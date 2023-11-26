import UseAuth from "../../Hooks/UseAuth";
import { FaGoogle } from "react-icons/fa";
const SocialLogin = () => {
    const { googleSignIn } = UseAuth();
    const handleGoogleSignIn = ()=>{
        googleSignIn()
        .then(res=>{
            console.log(res.user);
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