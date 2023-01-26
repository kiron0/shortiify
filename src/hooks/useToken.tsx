import { useEffect, useState } from "react";
import auth from "../auth/Firebase/firebase.init";
import { BASE_API } from "../config";

const useToken = (user: any) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const email = user?.user?.email;
    const displayName = user?.user?.displayName;
    const uid = user?.user?.uid;
    const currentUser = {
      email: email,
      displayName: displayName,
      uid: uid,
      image: auth?.currentUser?.photoURL,
    };
    if (email) {
      fetch(
        `${BASE_API}/user?email=${email}&&uid=${uid}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(uid);
          const accessToken = data.token;
          localStorage.setItem("accessToken", accessToken);
          // set user uid in local storage
          localStorage.setItem("uid", uid);
          setToken(accessToken);
        });
    }
  }, [user]);
  return [token];
};

export default useToken;
