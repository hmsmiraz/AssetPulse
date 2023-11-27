import { Link } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import useAdmin from "../Hooks/useAdmin";
import useEmployee from "../Hooks/useEmployee";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const [isAdmin] = useAdmin();
  const [isEmployee] = useEmployee();
  const navLinks = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/addHrAdmin"}>Join as HR/Admin</Link>
      </li>
      <li>
        <Link to={"/addAsset"}>AddAsset</Link>
      </li>
      <li>
        <Link to={"/addEmployee"}>Join as Employee</Link>
      </li>
      {user && isAdmin && (
        <li>
          <Link to={"/dashboard/adminHome"}>Dashboard</Link>
        </li>
      )}
       {user && isEmployee && (
        <li>
          <Link to={"/dashboard/adminHome"}>Employee</Link>
        </li>
      )}
    </>
  );
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <img src="/a.svg" alt="" className="w-6 h-6" />
        <a className="btn btn-ghost text-xl">AssetPulse</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <Link>
              <button onClick={handleLogout} className="btn btn-neutral">
                Logout
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <button className="btn btn-neutral">Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
