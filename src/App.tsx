import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { useQuery } from '@tanstack/react-query';
import { BASE_API } from './config';
import Root from './Layouts/Root';
import NotFound from './shared/NotFound/NotFound';
import Redirect from './pages/Redirect/Redirect';
import Dashboard from './pages/ManageDashboard/Dashboard/Dashboard';
import Index from './pages/ManageDashboard/Index/Index';
import Profile from './pages/ManageDashboard/Profile/Profile';
import Login from './pages/Authentication/Login/Login';
import RequireAuth from './auth/RequireAuth/RequireAuth';
import Setting from './pages/ManageDashboard/Setting/Setting';
import YourUrls from './pages/ManageDashboard/YourUrls/YourUrls';
import ManageUsers from './pages/ManageDashboard/ManageUsers/ManageUsers';
import LocalURLs from './pages/LocalURLs/LocalURLs';
import LocalRedirect from './pages/LocalRedirect/LocalRedirect';
import AllUrls from './pages/ManageDashboard/AllUrls/AllUrls';
import RequireDev from './auth/RequireDev/RequireDev';
import RequireAdminDev from './auth/RequireAdminDev/RequireAdminDev';

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
      path: "/l/:slug",
      element: <LocalRedirect />
    },
    {
      path: "/local/allUrls",
      element: <LocalURLs />
    },
    {
      path: "/pages/about",
      element: <NotFound />
    },
    {
      path: "/pages/contact",
      element: <NotFound />
    },
    {
      path: "/pages/termsOfService",
      element: <NotFound />
    },
    {
      path: "/pages/acceptableUse",
      element: <NotFound />
    },
    {
      path: "/pages/privacyPolicy",
      element: <NotFound />
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
          path: "/dashboard/yourUrls",
          element: <YourUrls />
        },
        {
          path: "/dashboard/allUrls",
          element: <RequireDev>
            <AllUrls />
          </RequireDev>
        },
        {
          path: "/dashboard/allUsers",
          element: <RequireAdminDev>
            <ManageUsers />
          </RequireAdminDev>
        },
        {
          path: "/dashboard/setting",
          element: <RequireDev>
            <Setting />
          </RequireDev>
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
