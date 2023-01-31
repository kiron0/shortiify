import React from "react";
import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <ScaleLoader color={"#19D3AE"} />
    </div>
  );
};

export default Loader;
