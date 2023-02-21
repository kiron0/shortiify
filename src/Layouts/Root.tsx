import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar/Navbar';
import Home from '../pages/Home/Home';
import useTitle from '../hooks/useTitle';
import Footer from '../shared/Footer/Footer';
import ScrollButton from '../shared/ScrollButton/ScrollButton';
import useAllUrls from '../hooks/useAllUrls';

export default function Root() {
  useTitle("Home");
  const [allURLs] = useAllUrls();

  return (
    <>
      <div className={`bg-[url('./assets/bg2.jpg')] ${JSON.parse(localStorage.getItem("localURLs") || "[]")?.length === 0 || allURLs?.length === 0 ? "h-screen" : ""}`}>
        <Navbar />
        <Home />
        <Footer />
        <ScrollButton />
      </div>
      <Outlet />
    </>
  )
}
