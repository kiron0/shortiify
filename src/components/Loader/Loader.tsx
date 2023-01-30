import React from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="bg-[url('./assets/bg.jpg')] h-screen flex justify-center items-center">
      <HashLoader size={55} color={"#19D3AE"} />
    </div>
  );
};

export default Loader;
