import React from 'react'
import useScrollToTop from "../../../hooks/useScrollToTop";
import auth from "../../../auth/Firebase/firebase.init";
import useTitle from '../../../hooks/useTitle';

export default function Index() {
  useTitle("Welcome")
  useScrollToTop();
  return (
    <div className="flex justify-center items-center h-[80vh] hero-content flex-col">
      <div className="lg:flex lg:mx-auto">
        <h2 className="text-3xl text-center lg:flex lg:gap-2 text-white">
          Welcome To Dashboard,{" "}
          <span className="block lg:flex text-primary">
            {auth?.currentUser?.displayName}
          </span>
        </h2>
      </div>
      <div className="flex mx-auto mt-4">
        <div className="avatar">
          <div className="w-48 mask mask-hexagon border-primary">
            <img src={auth?.currentUser?.photoURL as string} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

