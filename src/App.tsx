import React, { createContext, useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { BASE_API } from './config';
import Root from './Layouts/Root';
import NotFound from './shared/NotFound/NotFound';
import Redirect from './pages/Redirect/Redirect';
import Dashboard from './pages/ManageDashboard/Dashobard/Dashboard';
import Index from './pages/ManageDashboard/Index/Index';
import Profile from './pages/ManageDashboard/Profile/Profile';
import Login from './pages/Authentication/Login/Login';
import RequireAuth from './auth/RequireAuth/RequireAuth';
import RequireAdmin from './auth/RequireAdmin/RequireAdmin';
import Setting from './pages/ManageDashboard/Setting/Setting';
import AllUrls from './pages/ManageDashboard/AllUrls/AllUrls';
import ManageUsers from './pages/ManageDashboard/ManageUsers/ManageUsers';
import UserUrls from './pages/ManageDashboard/UserUrls/UserUrls';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />
    },
    {
      path: "/getStarted",
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
          path: "/dashboard/allUrls",
          element: <AllUrls />
        },
        {
          path: "/dashboard/allUsers",
          element: <RequireAdmin>
            <ManageUsers />
          </RequireAdmin>
        },
        {
          path: "/dashboard/user/urls/:uid",
          element: <RequireAdmin>
            <UserUrls />
          </RequireAdmin>
        },
        {
          path: "/dashboard/setting",
          element: <RequireAdmin>
            <Setting />
          </RequireAdmin>
        },
        {
          path: "*",
          element: <NotFound />
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
  const [theme, setTheme] = useState<string>("false");

  const handleThemeChange = () => {
    setTheme(!theme as any);
    window.localStorage.setItem("shortenerTheme", (!theme).toString());
  };

  const { data, refetch, isLoading } = useQuery(["appName"], async () => {
    const res = await axios.get(`${BASE_API}/app/appName`);
    return res?.data;
  });

  const appName = data?.appName;

  useEffect(() => {
    setTheme(JSON.parse(window.localStorage.getItem("shortenerTheme") || "false"));
    window.localStorage.getItem("uid");
  }, [refetch]);

  return (
    <>
      <InitializeContext.Provider value={{ appName, theme, handleThemeChange, setTheme, refetch, isLoading }}>
        <div data-theme={theme ? "halloween" : "night"}>
          <RouterProvider router={router} />
          <Toaster />
        </div>
      </InitializeContext.Provider>
    </>
  );
}

export default App;
