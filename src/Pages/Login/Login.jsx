import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn } = UseAuth();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .then(() => {
        //console.log(err);
      });
  };
  return (
    <div className="hero w-full min-h-screen bg-base-200">
      <div className="card  w-full max-w-lg shadow-2xl bg-base-100">
        <h2 className="text-3xl font-bold text-center my-4 text-stone-700">
          Please Login Here!
        </h2>
        <form className="card-body" onSubmit={handleLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control">
            <input
              type="submit"
              className="btn btn-primary rounded-md mt-2"
              value="Login"
            />
            <p className="text-center py-2 ">New Here? Create an account Please </p>
            <div className="flex gap-2 flex-col md:flex-row items-center justify-center">
              
              <div className="">
                <Link to={"/addEmployee"} className="text font-bold">
                  <button className="btn bg-blue-600 rounded-md text-white">
                    Register as Employee
                  </button>
                </Link>
              </div>
              <div>
                <Link to={"/addHrAdmin"} className="text-emerald-600 font-bold">
                  <button className="btn bg-emerald-600 rounded-md text-white">
                    Register as HR/Admin
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
