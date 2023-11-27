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
      {/* navbar for normal user */}
      <li>
        <Link
          to={
            user && isEmployee
              ? "/userHome"
              : user && isAdmin
              ? "/adminHome"
              : "/"
          }
        >
          Home
        </Link>
      </li>
      {!user && (
        <li>
          <Link to={"/addHrAdmin"}>Join as HR/Admin</Link>
        </li>
      )}
      {!user && (
        <li>
          <Link to={"/addEmployee"}>Join as Employee</Link>
        </li>
      )}
      {/* admin nav */}
      {user && isAdmin && (
        <li>
          <Link to={"/assetList"}>Asset List</Link>
        </li>
      )}
      {user && isAdmin && (
        <li>
          <Link to={"/addAsset"}>Add Asset</Link>
        </li>
      )}
      {user && isAdmin && (
        <li>
          <Link to={"/allRequest"}>ALL Requests</Link>
        </li>
      )}
      {user && isAdmin && (
        <li>
          <Link to={"/customReqList"}>Custom Requests List</Link>
        </li>
      )}
      {user && isAdmin && (
        <li>
          <Link to={"/employeeList"}>My Employee List</Link>
        </li>
      )}
      {user && isAdmin && (
        <li>
          <Link to={"/addAnEmployee"}>Add Employee</Link>
        </li>
      )}
      {user && isAdmin && (
        <li>
          <Link to={"/adminProfile"}>Profile</Link>
        </li>
      )}
      {/* employee nav */}
      {user && isEmployee && (
        <li>
          <Link to={"/myAssets"}>My Assets</Link>
        </li>
      )}
      {user && isEmployee && (
        <li>
          <Link to={"/myTeams"}>My Teams</Link>
        </li>
      )}
      {user && isEmployee && (
        <li>
          <Link to={"/reqAsset"}>Request Asset</Link>
        </li>
      )}
      {user && isEmployee && (
        <li>
          <Link to={"/CustomReq"}>Custom Request</Link>
        </li>
      )}
      {user && isEmployee && (
        <li>
          <Link to={"/userProfile"}>Profile</Link>
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
