import React from 'react'
import { toast } from 'react-hot-toast'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../auth/Firebase/firebase.init'
import { useQuery } from '@tanstack/react-query'
import { BASE_API } from '../../config'
import { Link } from 'react-router-dom'

export default function URLBox() {
          const [user] = useAuthState(auth);
          const uid = localStorage.getItem("uid");
          const {
                    data: urlsData = [],
          } = useQuery(["urls"], () =>
                    fetch(`${BASE_API}/user?uid=${uid}`, {
                              headers: {
                                        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                              },
                    }).then((res) => res.json()).then((data) => {
                              if (data?.error) {
                                        toast.error(data?.error);
                                        return;
                              }
                              return data;
                    })
          );

          // console.log(urlsData);

          return (
                    <div className='mt-12 md:mt-24'>
                              <div className='flex flex-col justify-center items-center gap-2 text-center text-white'>
                                        <h1 className='text-2xl md:text-5xl'>Hoho!</h1>
                                        <p className='text-xs md:text-lg'>Here are your shortened URLs! Now start rick-rolling your friends.</p>
                              </div>

                              {
                                        user ? (
                                                  <span>
                                                            {
                                                                      urlsData?.urls?.length > 0 ? (
                                                                                <div className='mt-8 md:mt-12 flex flex-col justify-center items-center'>
                                                                                          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto'>
                                                                                                    {urlsData?.urls?.slice(-2).reverse().map((item: any, index: number) => {
                                                                                                              return (
                                                                                                                        <div className="card w-[350px] bg-neutral shadow-xl text-white" key={index}>
                                                                                                                                  <div className="card-body">
                                                                                                                                            <p><a href={item?.url} target="_blank" rel="noopener noreferrer">{item?.url.length > 35 ? item?.url?.slice(0, 35) + "..." : item?.url}</a></p>
                                                                                                                                            <a className='text-secondary' href={`${window.location.href}k/${item?.slug}`}>{window.location.href}k/{item?.slug} <i className='bx bx-link-external'></i></a>
                                                                                                                                            <div className='flex justify-center items-center'>
                                                                                                                                                      <p>{item?.createdAt}</p>

                                                                                                                                                      <div className='flex items-center gap-3'>
                                                                                                                                                                <i className='bx bx-copy cursor-pointer text-secondary text-xl' onClick={() => {
                                                                                                                                                                          toast.success("Copied to clipboard!")
                                                                                                                                                                }}></i>
                                                                                                                                                                <i className='bx bx-trash cursor-pointer text-error text-xl' onClick={() => {
                                                                                                                                                                          toast.success("Deleted Successfully!")
                                                                                                                                                                }}></i>
                                                                                                                                                      </div>
                                                                                                                                            </div>
                                                                                                                                  </div>
                                                                                                                        </div>
                                                                                                              )
                                                                                                    })}
                                                                                          </div>

                                                                                          <div className='pt-6 md:pt-10'>
                                                                                                    <Link to="/dashboard/allLinks"><button className='btn'>See All</button></Link>
                                                                                          </div>
                                                                                </div>
                                                                      ) : (
                                                                                <div className='flex justify-center items-center mt-6'>
                                                                                          <div className='card w-[350px] bg-neutral shadow-xl text-white'>
                                                                                                    <div className="card-body">
                                                                                                              <p className='text-center'>No URLs found!</p>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                      )
                                                            }
                                                  </span>
                                        ) : (
                                                  <div className='flex justify-center items-center mt-6'>
                                                            <div className='card w-[350px] bg-neutral shadow-xl text-white'>
                                                                      <div className="card-body">
                                                                                <p className='text-center'>Please login to view your URLs!</p>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        )
                              }
                    </div>
          )
}
