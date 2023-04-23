import React, { useState, useEffect } from "react";
import { BASE_API } from "../../../config";
import useScrollToTop from "../../../hooks/useScrollToTop";
import useTitle from "../../../hooks/useTitle";
import Loader from "../../../components/Loader/Loader";
import UrlsCard from "./UrlsCard";
import auth from "../../../auth/Firebase/firebase.init";

const Fade = require("react-reveal/Fade");

export default function AllUrls() {
          useScrollToTop();
          useTitle("Manage All Urls");
          const [urlsData, setUrlsData] = useState<any>([]);
          const [filterUrls, setFilterUrls] = useState<string>(`${auth?.currentUser?.email}`);
          const [loading, setLoading] = useState<boolean>(false);
          const [gmailUsers, setGmailUsers] = useState<any>([]);

          const handleFilterUrls = (e: any) => {
                    const value = e.target.value.toLowerCase();
                    setFilterUrls(value);
          };

          useEffect(() => {
                    setLoading(true);
                    fetch(`${BASE_API}/users/allUrls/email?email=${filterUrls}`, {
                              headers: {
                                        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                              },
                    })
                              .then((res) => res.json())
                              .then((data) => {
                                        if (data?.result?.length > 0) {
                                                  setUrlsData(data?.result);
                                                  setLoading(false);
                                        } else {
                                                  setUrlsData([]);
                                                  setLoading(false);
                                        }
                              });
          }, [filterUrls]);

          useEffect(() => {
                    setLoading(true);
                    fetch(`${BASE_API}/users/usersMail`, {
                              headers: {
                                        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                              },
                    })
                              .then((res) => res.json())
                              .then((data) => {
                                        if (data?.result?.length > 0) {
                                                  const currentMail = data?.result?.find((userMail: any) => userMail.email === auth?.currentUser?.email);
                                                  const filteredMail = data?.result?.filter((userMail: any) => userMail.email !== auth?.currentUser?.email);
                                                  if (currentMail) {
                                                            setGmailUsers([currentMail, ...filteredMail]);
                                                  } else {
                                                            setGmailUsers(data?.result);
                                                  }
                                        } else {
                                                  setGmailUsers([]);
                                        }
                              });
          }, []);

          const allUrls = urlsData[0]?.urls;

          return (
                    <div className="lg:px-4 py-7">
                              <div className='flex flex-col md:flex-row justify-between items-center mb-7 md:mb-0'>
                                        <div className="title mb-4 px-4 lg:py-4 text-white">
                                                  <h3 className="text-2xl font-semibold">Manage All The Urls</h3>
                                                  <span>You can see all the Urls which are added by the users.</span>
                                        </div>
                                        <div className='form-control max-w-xs md:pb-7 lg:pb-4 md:w-1/3 flex w-full justify-center'>
                                                  <label className="label">
                                                            <span className="label-text text-white">Filter by email {gmailUsers?.length > 0 && <span className="text-primary font-semibold">({gmailUsers?.length})</span>}</span>
                                                  </label>
                                                  <select className="select select-bordered w-full max-w-xs text-white bg-primary"
                                                            onChange={handleFilterUrls}
                                                            defaultValue={filterUrls}
                                                  >
                                                            {gmailUsers?.map((gmailUser: any) => (
                                                                      <option key={gmailUser._id} value={gmailUser.email}>
                                                                                {gmailUser.email}
                                                                      </option>
                                                            ))}
                                                  </select>
                                        </div>
                              </div>

                              {
                                        loading ? (
                                                  <Loader />
                                        ) : (
                                                  <div className='flex justify-center mx-auto mb-10'>
                                                            <div className="card w-full md:w-[450px] bg-[url('./assets/bg.jpg')] shadow-xl text-white mt-2">
                                                                      <div className="card-body">
                                                                                <figure>
                                                                                          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto my-4 border ring ring-primary ring-offset-base-100 ring-offset-2">
                                                                                                    <img
                                                                                                              src={urlsData[0]?.image as string}
                                                                                                              alt="profile"
                                                                                                              className="w-full h-full rounded-full"
                                                                                                    />
                                                                                          </div>
                                                                                </figure>
                                                                                <p className='card-title mx-auto'>{urlsData[0]?.displayName}</p>
                                                                                <p className='text-center'>{urlsData[0]?.email}</p>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        )
                              }

                              <div>
                                        {loading ? (
                                                  <Loader />
                                        ) : allUrls?.length > 0 ? (
                                                  <Fade top distance="20px">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto lg:px-4 lg:mt-10">
                                                                      {allUrls?.map((url: any) => (
                                                                                <UrlsCard key={url._id} url={url} loading={loading} />
                                                                      ))}
                                                            </div>
                                                  </Fade>
                                        ) : (
                                                  <div className="flex items-center justify-center mx-auto rounded">
                                                            <div>
                                                                      <div className="alert alert-warning shadow-lg" role="alert">
                                                                                <div>
                                                                                          <svg
                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                    className="stroke-current flex-shrink-0 h-6 w-6"
                                                                                                    fill="none"
                                                                                                    viewBox="0 0 24 24"
                                                                                          >
                                                                                                    <path
                                                                                                              stroke-linecap="round"
                                                                                                              stroke-linejoin="round"
                                                                                                              stroke-width="2"
                                                                                                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                                                                    />
                                                                                          </svg>
                                                                                          <span className="select-none text-center">No urls for the user: {filterUrls} </span>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        )}
                              </div>
                    </div>
          );
};
