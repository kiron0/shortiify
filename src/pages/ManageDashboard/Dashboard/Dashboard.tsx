import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import URL from "../../../assets/url.png";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useUserRole from "../../../hooks/useUserRole";
import useProfileImage from "../../../hooks/useProfileImage";
import auth from "../../../auth/Firebase/firebase.init";
import { InitializeContext } from "../../../App";
import { AiOutlineLink } from "react-icons/ai";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";

const Dashboard: any = () => {
  const { appName, theme, handleThemeChange } = useContext(InitializeContext);
  const [user, isLoading] = useAuthState(auth);
  const [userRole, userRoleLoading] = useUserRole(user);
  const [image] = useProfileImage(user);
  const navigate = useNavigate();

  const handleLogOut = () => {
    // swal for confirmation
    Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out from this account.",
      icon: "warning",
      showCancelButton: true,
      background: theme === "night" ? "#333" : "#fff",
      color: theme === "night" ? "#fff" : "#333",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        // sign out from firebase
        signOut(auth).then(() => {
          localStorage.removeItem("accessToken");
          navigate("/");
          toast.success(`Thank you, ${user?.displayName} to stay with us!`, {
            position: "top-center",
          });
        }).catch((err) => {
          // toast for error
          toast(err.message, {
            icon: '👎',
          })
        })
      }
    })
  };

  if (isLoading || userRoleLoading) {
    return <Loading />;
  }

  return (
    <div className="drawer drawer-mobile bg-[url('./assets/bg2.jpg')]">
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-3 md:p-3">
        <div className="header z-50 sticky top-0 flex justify-between items-center bg-[url('./assets/bg.jpg')] shadow-lg p-4 rounded-xl">
          <label
            htmlFor="dashboard-sidebar"
            className="btn btn-outline btn-primary border-primary drawer-button lg:hidden text-white"
          >
            <MdSpaceDashboard className="text-2xl text-white" />
          </label>
          <div className="flex items-center gap-1 text-white">
            <h1 className="text-lg md:text-2xl font-semibold hidden md:flex">
              Welcome to
            </h1>
            <Link
              to="/"
              className="text-xl md:text-2xl font-semibold md:text-primary"
            >
              <span className="text-primary">{appName}</span> <small className="text-sm">- URL Shortener</small>
            </Link>
            <h1 className="text-lg md:text-2xl font-semibold hidden md:flex">
              {userRole && userRole === "developer" ? "Developer" : userRole === "admin" ? "Admin" : "User"} Panel
            </h1>
          </div>
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar online"
            >
              <div
                style={{ display: "grid" }}
                className="w-10 h-10  place-items-center rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
              >
                {auth?.currentUser?.photoURL ? (
                  <img
                    src={auth?.currentUser?.photoURL}
                    alt={auth?.currentUser?.displayName || ""}
                  />
                ) : (
                  <img src={image as string} alt={auth?.currentUser?.displayName || ""} />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-6 -mr-4 p-2 shadow-xl menu menu-compact dropdown-content rounded-box w-72 bg-[url('./assets/bg.jpg')]"
            >
              <span className="absolute top-2 right-2 cursor-pointer" onClick={handleThemeChange}>
                {
                  theme ? (
                    <input type="checkbox" className="toggle toggle-xs bg-primary" checked />
                  ) : (
                    <input type="checkbox" className="toggle toggle-xs bg-primary" />
                  )
                }
              </span>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto my-4 border ring ring-primary ring-offset-base-100 ring-offset-2">
                {auth?.currentUser?.photoURL ? (
                  <img
                    src={auth?.currentUser?.photoURL}
                    alt={auth?.currentUser?.displayName || ""}
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <img
                    src={image as string}
                    alt={auth?.currentUser?.displayName || ""}
                    className="w-16 h-16 rounded-full"
                  />
                )}
              </div>
              <div className="text-center mb-4 text-white">
                <span className="font-semibold">Hello,</span>
                <span className="flex justify-center items-center gap-1 font-semibold">
                  <h2 className="text-success">
                    {auth?.currentUser?.displayName}
                  </h2>
                  <i className='bx bxs-hand' ></i>
                </span>
                <div className="flex flex-col items-center gap-1 pt-2 md:hidden">
                  <h1 className="font-semibold">
                    Welcome to,{" "}
                    <span className="font-semibold text-primary">
                      <Link to="/">{appName}</Link>
                    </span>
                  </h1>
                  <h1 className="font-semibold">
                    ({userRole && userRole === "developer" ? "Developer" : userRole === "admin" ? "Admin" : "User"} Panel)
                  </h1>
                </div>
                <div className="flex justify-center">
                  <Link to="/dashboard/me" className="hidden md:flex">
                    <button className="btn btn-outline mt-4 rounded-full text-white hover:text-white hover:bg-primary hover:border-primary">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
              <hr className="font-semibold" />
              <li className="py-1 font-semibold md:hidden text-white">
                <Link to="/dashboard/me">
                  <i className="bx bxs-user font-semibold"></i> Profile
                </Link>
              </li>
              <li className="py-1 text-white">
                <button onClick={handleLogOut} className="font-semibold">
                  <i className="bx bx-log-out font-semibold"></i>
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
      <div className="drawer-side shadow-xl">
        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content bg-[url('./assets/bg.jpg')]">
          <div className="flex flex-col items-center gap-3 text-2xl p-2 border-b pb-5">
            <Link
              to="/"
              className="logo font-semibold text-center flex items-center flex-col gap-2 text-white"
            >
              <img src={URL} alt="" className="w-16" /> {appName}
              <p className="text-sm">A URL Shortener Web App</p>
            </Link>
          </div>
          <li className="py-2 mt-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-white bg-primary" : ""
              }
              to="/dashboard"
            >
              <i className="bx bxs-dashboard text-xl"></i> Dashboard
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-white bg-primary" : "text-white"
              }
              to="/dashboard/yourUrls"
            >
              <AiOutlineLink className="text-lg" /> Manage Your URLs
            </NavLink>
          </li>
          {userRole === "admin" || userRole === "developer" ? (
            <li className="py-2">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-white bg-primary" : "text-white"
                }
                to="/dashboard/allUsers"
              >
                <i className="bx bxs-user-detail text-xl"></i> Manage All The
                Users
              </NavLink>
            </li>
          ) :
            (
              <></>
            )
          }
          {
            userRole === "developer" && (
              <>
                <li className="py-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-white bg-primary" : "text-white"
                    }
                    to="/dashboard/allUrls"
                  >
                    <AiOutlineLink className="text-lg" /> Manage All The
                    URLs
                  </NavLink>
                </li>
                <li className="py-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-white bg-primary" : "text-white"
                    }
                    to="/dashboard/setting"
                  >
                    <i className="bx bx-cog text-xl"></i> Setting
                  </NavLink>
                </li>
              </>
            )
          }
          <li className="absolute bottom-5 w-72">
            <button
              onClick={handleLogOut}
              className="bg-transparent hover:bg-primary hover:border-primary border-2 border-white rounded-lg text-white duration-300"
            >
              <i className="bx bx-log-out"></i> Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
