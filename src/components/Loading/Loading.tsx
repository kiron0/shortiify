import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center backdrop-blur-[9px]">
      <ScaleLoader color={'#19D3AE'} />
    </div>
  );
};

export default Loading;
