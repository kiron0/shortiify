import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar/Navbar';
import Home from '../pages/Home/Home';
import useTitle from '../hooks/useTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../auth/Firebase/firebase.init';

export default function Root() {
  useTitle("Home")
  const [user] = useAuthState(auth);
  return (
    <>
      <div className={`bg-[url('./assets/bg.jpg')] ${user ? "pb-7" : "h-screen bg-no-repeat"}`}>
        <Navbar />
        <Home />
      </div>
      <Outlet />
    </>
  )
}
