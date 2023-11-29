import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home/Home/Home";
import AddEmployee from "../Pages/AddEmployee/AddEmployee";
import AddHrAdmin from "../Pages/AddHrAdmin/addHrAdmin";
import Login from "../Pages/Login/Login";
import AddAsset from "../Pages/AddAsset/AddAsset";
import AdminRoute from "./AdminRoute";
import AdminHome from "../Pages/AdminPages/AdminHome/AdminHome";
import UserHome from "../Pages/UserPages/UserHome/UserHome";
import UserProfile from "../Pages/UserPages/UserProfile/UserProfile";
import AdminProfile from "../Pages/AdminPages/AdminProfile/AdminProfile";
import MyAssets from "../Pages/UserPages/MyAssets/MyAssets";
import MyTeams from "../Pages/UserPages/MyTeams/MyTeams";
import ReqAsset from "../Pages/UserPages/ReqAsset/ReqAsset";
import CustomReq from "../Pages/UserPages/CustomReq/CustomReq";
import AssetList from "../Pages/AdminPages/AssetList/AssetList";
import AllRequests from "../Pages/AdminPages/AllRequests/AllRequests";
import CustomReqList from "../Pages/AdminPages/CustomReqList/CustomReqList";
import MyEmployeeList from "../Pages/AdminPages/MyEmployeeList/MyEmployeeList";
import AddAnEmployee from "../Pages/AdminPages/AddAnEmployee/AddAnEmployee";
import Payment from "../Pages/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addHrAdmin",
        element: <AddHrAdmin></AddHrAdmin>,
      },
      {
        path: "/addEmployee",
        element: <AddEmployee></AddEmployee>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      // user's route
      {
        path: "/userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "/myAssets",
        element: <MyAssets></MyAssets>
      },
      {
        path: "/myTeams",
        element: <MyTeams></MyTeams>
      },
      {
        path: "/reqAsset",
        element: <ReqAsset></ReqAsset>
      },
      {
        path: "/CustomReq",
        element: <CustomReq></CustomReq>
      },
      {
        path: "/userProfile",
        element: <UserProfile></UserProfile>,
      },
      // Admin Routes's
      {
        path: '/payment',
        element: <Payment></Payment>,
      },
      {
        path: "/adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "/assetList",
        element: <AssetList></AssetList>,
      },
      {
        path: "/addAsset",
        element: <AdminRoute><AddAsset></AddAsset></AdminRoute>,
      },
      {
        path: "/allRequest",
        element: <AllRequests></AllRequests>,
      },
      {
        path: "/customReqList",
        element: <CustomReqList></CustomReqList>,
      },
      {
        path: "/employeeList",
        element: <MyEmployeeList></MyEmployeeList>,
      },
      {
        path: "/addAnEmployee",
        element: <AddAnEmployee></AddAnEmployee>,
      },
      {
        path: "/adminProfile",
        element: <AdminProfile></AdminProfile>,
      },
    ],
  },
]);
