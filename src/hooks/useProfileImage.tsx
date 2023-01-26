import { useState, useEffect } from "react";
import { BASE_API } from "../config";

const useProfileImage = (user: any) => {
  const [image, setImage] = useState({});
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const uid = localStorage.getItem("uid");
      const result = await fetch(
        `${BASE_API}/users?uid=${uid}`
      );
      const data = await result.json();
      setImage(data[0]?.image);
      setImageLoading(false);
    };
    fetchData();
  }, [user, image]);

  return [image, imageLoading];
};

export default useProfileImage;
