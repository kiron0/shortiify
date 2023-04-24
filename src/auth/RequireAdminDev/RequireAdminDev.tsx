import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Loading from "../../components/Loading/Loading";
import auth from "../Firebase/firebase.init";
import useUserRole from "../../hooks/useUserRole";
import { toast } from "react-hot-toast";

type Props = {
          children: any;
};

const RequireAdminDev = ({ children }: Props) => {
          const [user, loading] = useAuthState(auth);
          const [userRole, setUserRoleLoading] = useUserRole(user);
          const navigate = useNavigate();
          const location = useLocation();

          const userRoles = ["admin", "developer"];
          const matchUserRole = userRoles.find((role) => role === userRole);

          if (loading || setUserRoleLoading) {
                    return <Loading />;
          }

          if (!user || !matchUserRole) {
                    signOut(auth);
                    navigate("/")
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("uid");
                    toast.error("You are not authorized to access this page");
                    return <Navigate to="/getStarted" state={{ from: location }} replace></Navigate>;
          }
          return children;
};

export default RequireAdminDev;
