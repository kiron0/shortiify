import React, { createContext, useEffect } from 'react';
import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Layouts/Root';
import NotFound from './shared/NotFound/NotFound';
import Redirect from './pages/Redirect/Redirect';
import Dashboard from './pages/ManageDashboard/Dashobard/Dashboard';
import Index from './pages/ManageDashboard/Index/Index';
import Profile from './pages/ManageDashboard/Profile/Profile';
import Login from './pages/Authentication/Login/Login';
import RequireAuth from './auth/RequireAuth/RequireAuth';
import RequireAdmin from './auth/RequireAdmin/RequireAdmin';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API } from './config';
import Setting from './pages/ManageDashboard/Setting/Setting';
import AllLinks from './pages/ManageDashboard/AllLinks/AllLinks';
import ManageUsers from './pages/ManageDashboard/ManageUsers/ManageUsers';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/k/:slug",
      element: <Redirect />
    },
    {
      path: "/dashboard",
      element: <RequireAuth>
        <Dashboard />
      </RequireAuth>,
      children: [
        {
          path: "/dashboard",
          element: <Index />
        },
        {
          path: "/dashboard/me",
          element: <Profile />
        },
        {
          path: "/dashboard/allLinks",
          element: <AllLinks />
        },
        {
          path: "/dashboard/allUsers",
          element: <RequireAdmin>
            <ManageUsers />
          </RequireAdmin>
        },
        {
          path: "/dashboard/setting",
          element: <RequireAdmin>
            <Setting />
          </RequireAdmin>
        }
      ]
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]
)

export const InitializeContext = createContext(null as any);

function App() {
  const { data, refetch, isLoading } = useQuery(["appName"], async () => {
    const res = await axios.get(`${BASE_API}/app/appName`);
    return res?.data;
  });

  const appName = data?.appName;

  // disabled right click
  useEffect(() => {
    // document.addEventListener("contextmenu", (e) => {
    //   e.preventDefault();
    // });
    window.localStorage.getItem("uid");
  }, [refetch]);

  return (
    <>
      <InitializeContext.Provider value={{ appName, refetch, isLoading }}>
        <RouterProvider router={router} />
        <Toaster />
      </InitializeContext.Provider>
    </>
  );
}

export default App;
