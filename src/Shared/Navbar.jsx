import { Link } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import useAdmin from "../Hooks/useAdmin";
import useEmployee from "../Hooks/useEmployee";
import useUsers from "../Hooks/useUsers";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const [isAdmin] = useAdmin();
  const [isEmployee] = useEmployee();
  const [users] = useUsers();
  const email = user?.email;
  const mainUsers = users?.filter((user) => user.email == email);
  // console.log(mainUsers);
  const companyName = mainUsers[0]?.companyName;
  const companyLogo = mainUsers[0]?.companyLogo;
  const Name = mainUsers[0]?.name;
  const Image = mainUsers[0]?.image;
  // console.log(Name, Image, companyName, companyLogo);
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
        {user ? (
          <img src={companyLogo} alt="" className="w-8 h-8 rounded-lg" />
        ) : (
          <img src="/a.svg" alt="" className="w-6 h-6" />
        )}
        {user ? (
          <a className="btn btn-ghost text-xl">{companyName}</a>
        ) : (
          <a className="btn btn-ghost text-xl">AssetPulse</a>
        )}
       
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div>
            {user ? (
              <p className="font-light text-xs w-10 lg:w-20">{Name}</p>
            ) : (
              ""
            )}
          </div>
          <div>
            {user ? (
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-5 lg:w-10 rounded-full">
                  <img src={Image} />
                </div>
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="">
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
    </div>
  );
};

export default Navbar;
