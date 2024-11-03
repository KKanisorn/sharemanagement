import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, createBrowserRouter, RouterProvider, Routes} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './Component/HomePage'
import Login from './Component/Login'
import Register from "./Component/Register";
import Dashboard from "./Component/Dashboard";
import Profile from "./Component/ProtectdRoute";
import ProtectdRoute from "./Component/ProtectdRoute";
import VaildToken from "./Component/ValidToken";

const router = createBrowserRouter([
    {
        path: "/",
        element: (<HomePage/>),
    },
    {
        path: "login",
        element: (<Login/>),
    },
    {
        path: "register",
        element: (<Register/>),
    },
    {
        path: "dashboard",
        element:
            <ProtectdRoute>
                <Dashboard/>
            </ProtectdRoute>

    },
    {
        path: "vaildtoken",
        element:<VaildToken/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
