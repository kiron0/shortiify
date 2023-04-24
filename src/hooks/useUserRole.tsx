import { useEffect, useState } from "react";
import { BASE_API } from "../config";

const useUserRole = (user: any) => {
  const [userRole, setUserRole] = useState<any>({});
  const [userRoleLoading, setUserRoleLoading] = useState<boolean>(true);

  useEffect(() => {
    const email = user?.email;
    if (email) {
      fetch(`${BASE_API}/users/role/find?email=${email}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setUserRole(data?.userRole);
            setUserRoleLoading(false);
          } else {
            setUserRole({});
            setUserRoleLoading(false);
          }
        });
    }
  }, [user]);

  return [userRole, userRoleLoading];
};

export default useUserRole;
