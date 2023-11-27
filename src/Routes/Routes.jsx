import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home/Home/Home";
import AddEmployee from "../Pages/AddEmployee/AddEmployee";
import AddHrAdmin from "../Pages/AddHrAdmin/addHrAdmin";
import Login from "../Pages/Login/Login";
import AddAsset from "../Pages/AddAsset/AddAsset";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts></MainLayouts>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
          path: '/addHrAdmin',
          element: <AddHrAdmin></AddHrAdmin>,
        },
        {
            path: '/addEmployee',
            element: <AddEmployee></AddEmployee>,
        },
        {
            path: '/addAsset',
            element: <AddAsset></AddAsset>,
        },
        {
            path: '/login',
            element: <Login></Login>,
        },
      ]
    },
  ]);
