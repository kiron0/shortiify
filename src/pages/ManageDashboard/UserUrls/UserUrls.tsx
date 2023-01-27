import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { BASE_API } from '../../../config';
import { toast } from 'react-hot-toast';
import UrlsCard from './UrlsCard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';

const Fade = require("react-reveal/Fade");

export default function UserUrls() {
          const { uid } = useParams();
          const navigate = useNavigate();
          const {
                    data: urlsData = [],
                    isLoading,
                    refetch,
          } = useQuery(["urls"], () =>
                    fetch(`${BASE_API}/user/urls/${uid}`, {
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

          if (isLoading || !urlsData) return (
                    <Loader />
          )

          return (
                    <Fade top distance="20px">
                              <div className='pb-10'>
                                        <div className="title mt-3 md:mt-8 md:mx-8">
                                                  <h3 className="text-2xl font-semibold">Manage URLs of <span className='text-primary cursor-pointer' onClick={() => navigate(-1)}>{urlsData?.displayName?.split(' ').slice(0, -1).join(' ')}</span></h3>
                                                  <span>You can manage all the URLs whom are already created</span>
                                        </div>

                                        <div className='flex justify-center mx-auto'>
                                                  <div className='card w-full md:w-[450px] bg-primary shadow-xl text-white mt-2'>
                                                            <div className="card-body">
                                                                      <figure>
                                                                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto my-4 border ring ring-primary ring-offset-base-100 ring-offset-2">
                                                                                          <img
                                                                                                    src={urlsData?.image as string}
                                                                                                    alt="profile"
                                                                                                    className="w-full h-full rounded-full"
                                                                                          />
                                                                                </div>
                                                                      </figure>
                                                                      <p className='card-title mx-auto'>{urlsData?.displayName}</p>
                                                                      <p className='text-center'>{urlsData?.email}</p>
                                                            </div>
                                                  </div>
                                        </div>
                                        {
                                                  urlsData?.urls?.length > 0 ? (
                                                            <div className='mt-8 md:mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                                                      {urlsData?.urls?.slice(0).reverse()?.map((item: any, index: number) => {
                                                                                return (
                                                                                          <UrlsCard item={item} key={index} refetch={refetch} isLoading={isLoading} />
                                                                                )
                                                                      })}
                                                            </div>
                                                  ) : (
                                                            <div className='flex justify-center items-center mt-6'>
                                                                      <div className='card w-[350px] bg-neutral shadow-xl text-white'>
                                                                                <div className="card-body">
                                                                                          <p className='text-center'>No URLs found!</p>
                                                                                </div>
                                                                                <div className='flex justify-center items-center pb-6'>
                                                                                          <Link to="/"><button className='btn btn-sm btn-primary'>Go to Home</button></Link>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  )
                                        }
                              </div>
                    </Fade>
          )
}
