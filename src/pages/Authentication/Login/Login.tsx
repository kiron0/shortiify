import React, { useContext, useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import useToken from "../../../hooks/useToken";
import auth from "../../../auth/Firebase/firebase.init";
import useTitle from "../../../hooks/useTitle";
import useScrollToTop from "../../../hooks/useScrollToTop";
import Preloader from "../../../shared/Preloader/Preloader";
import { InitializeContext } from "../../../App";

const Login = () => {
  useScrollToTop();
  useTitle("Login");
  const { appName } = useContext(InitializeContext);
  const [signInWithGoogle, gUser, gLoading] = useSignInWithGoogle(auth);
  const [token] = useToken(gUser);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
      toast.success(`Welcome to ${appName}, ${auth?.currentUser?.displayName}`);
    }
  }, [token, navigate, from, appName]);

  if (gLoading) {
    return <Preloader />;
  }

  if (token) {
    navigate(from, { replace: true });
  }

  return (
    <div className="bg-[url('./assets/bg.jpg')] h-screen justify-center items-center flex w-full">
      <div className="card w-full max-w-md">
        <div className="card-body">
          <h2 className="text-center text-white text-4xl font-bold pb-6">Login</h2>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline border-white text-white flex items-center justify-center rounded-full hover:bg-white duration-500 gap-2 hover:text-black w-full"
          >
            <i className="bx bxl-google text-2xl"></i>Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
