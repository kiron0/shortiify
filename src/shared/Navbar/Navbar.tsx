import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";
import useProfileImage from "../../hooks/useProfileImage";
import auth from "../../auth/Firebase/firebase.init";
import URL from "../../assets/url.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { RxRocket } from 'react-icons/rx'
import { InitializeContext } from "../../App";

export default function Navbar() {
  useScrollToTop();
  const { appName, theme, handleThemeChange } = useContext(InitializeContext);
  const [user] = useAuthState(auth);
  const [image] = useProfileImage(user);
  const [scrollY, setScrollY] = useState() as any;

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollY(position as any);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const handleLogOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    toast.success(`Thank you, ${user?.displayName} to stay with us!`, {
      position: "top-center",
    });
  };

  return (
    <div className={`sticky top-0 z-50 duration-300 ${scrollY > 30 ? "bg-[url('./assets/bg.jpg')] shadow-md" : "bg-transparent"}`}>
      <div className="navbar w-full container mx-auto">
        <div className="flex-1 items-center -ml-4 md:ml-0">
          <a className="btn btn-ghost normal-case text-xl md:text-2xl text-white" href='/'><img src={URL} alt="" className="w-11 md:w-12 md:mr-2" />{appName}</a>
        </div>
        <div>
          {!user && (
            <NavLink
              to="/getStarted"
              className="btn flex gap-2 items-center btn-primary text-white"
            >
              <RxRocket /> Get Started
            </NavLink>
          )}
        </div>
        {user && (
          <div className="flex-none gap-2">
            <h2 className="text-white">Hi, {auth?.currentUser?.displayName?.split(' ').slice(0, -1).join(' ')}!</h2>
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
              >
                <div
                  style={{ display: "grid" }}
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border bg-base-300 grid place-items-center ring ring-primary ring-offset-base-100 ring-offset-2"
                >
                  {auth?.currentUser?.photoURL ? (
                    <img
                      src={auth?.currentUser?.photoURL}
                      alt={auth?.currentUser?.displayName?.slice(0, 1)}
                    />
                  ) : (
                    <img
                      src={image as string}
                      alt={auth?.currentUser?.displayName?.slice(0, 2)}
                    />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow-xl menu menu-compact dropdown-content bg-[url('./assets/bg.jpg')] text-white rounded-box w-72"
              >
                <span className="absolute top-2 right-2 cursor-pointer" onClick={handleThemeChange}>
                  {
                    theme ? (
                      <input type="checkbox" className="toggle toggle-xs" checked />
                    ) : (
                      <input type="checkbox" className="toggle toggle-xs" />
                    )
                  }
                </span>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto my-4 border ring ring-primary ring-offset-base-100 ring-offset-2">
                  {auth?.currentUser?.photoURL ? (
                    <img
                      src={auth?.currentUser?.photoURL}
                      alt="profile"
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <img
                      src={image as string}
                      alt="profile"
                      className="w-full h-full rounded-full"
                    />
                  )}
                </div>
                <div className="text-center mb-4">
                  <h2 className="font-semibold text-lg">
                    {auth?.currentUser?.displayName}
                  </h2>

                  <p className="text-xs">
                    User ID: <span className="font-semibold">USER-{auth?.currentUser?.uid?.slice(0, 6)}</span>
                  </p>

                  <Link to="/dashboard/me">
                    <button className="btn btn-outline mt-4 rounded-full text-white hover:text-white hover:bg-primary">
                      View Profile
                    </button>
                  </Link>
                </div>
                <hr className="font-semibold" />
                <li className="py-1 font-semibold">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-white bg-primary" : ""
                    }
                    to="/dashboard"
                  >
                    <i className="bx bxs-dashboard"></i> Dashboard
                  </NavLink>
                </li>
                <li className="py-1 font-semibold">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-white bg-primary" : ""
                    }
                    to="/dashboard/allUrls"
                  >
                    <i className='bx bx-link'></i> Your URLs
                  </NavLink>
                </li>
                <li className="py-1">
                  <button
                    onClick={handleLogOut}
                    className="font-semibold"
                  >
                    <i className="bx bx-log-out font-semibold"></i>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
