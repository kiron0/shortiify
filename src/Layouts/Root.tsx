import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar/Navbar';
import Home from '../pages/Home/Home';
import useTitle from '../hooks/useTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../auth/Firebase/firebase.init';
import Footer from '../shared/Footer/Footer';
import ScrollButton from '../shared/ScrollButton/ScrollButton';

export default function Root() {
  useTitle("Home")
  const [user] = useAuthState(auth);

  return (
    <>
      <div className={`bg-[url('./assets/bg2.jpg')] ${user ? "pb-52 md:pb-72 lg:pb-80" : "h-screen bg-no-repeat"}`}>
        <Navbar />
        <Home />
        <Footer />
        <ScrollButton />
      </div>
      <Outlet />
    </>
  )
}
