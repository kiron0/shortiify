import { useEffect, useState } from "react";
import { BASE_API } from "../config";

export default function useAllUrls() {
          const [allURLs, setAllURLs] = useState([] as any);
          const [loading, setLoading] = useState(false);
          const uid = localStorage.getItem("uid");

          useEffect(() => {
                    fetch(`${BASE_API}/user?uid=${uid}`, {
                              headers: {
                                        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                              },
                    })
                              .then((res) => res.json())
                              .then((data) => {
                                        setAllURLs(data?.urls);
                                        setLoading(true);
                              });
          }, [uid]);
          return [allURLs, loading];
}
