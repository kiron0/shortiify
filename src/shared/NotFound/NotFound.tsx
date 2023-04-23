import React from "react";
import notFound from "../../assets/404.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[url('./assets/bg2.jpg')] bg-cover">
      <img src={notFound} alt="" className="bg-cover" />
      <Link to="/" className="absolute bottom-0 right-0 mr-10 mb-10">
        <button className="glass text-white font-bold py-2 px-4 rounded">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
