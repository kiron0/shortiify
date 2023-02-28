import React, { useState, useEffect } from 'react'
import { BASE_API } from '../../../config';
import UrlsCard from './UrlsCard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import axios from 'axios';

const Fade = require("react-reveal/Fade");

export default function UserUrls() {
          const { uid } = useParams();
          const navigate = useNavigate();
          const [urlsData, setUrlsData] = useState<any>([]);
          const [isLoading, setIsLoading] = useState<boolean>(false);

          useEffect(() => {
                    setIsLoading(true);
                    const fetchNidInfo = async () => {
                              const res = await axios.get(`${BASE_API}/user/urls/${uid}`, {
                                        headers: {
                                                  authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                        },
                              });
                              setUrlsData(res?.data);
                              setIsLoading(false);
                    }
                    fetchNidInfo()
          }, [uid])

          if (isLoading || !urlsData) return (
                    <Loader />
          )

          return (
                    <Fade top distance="20px">
                              <div className='pb-10'>
                                        <div className="title mt-3 md:mt-8 md:mx-8">
                                                  <h3 className="text-2xl font-semibold text-white">Manage URLs of <span className='text-primary cursor-pointer' onClick={() => navigate(-1)}>{urlsData?.displayName?.split(' ').slice(0, -1).join(' ')}</span></h3>
                                                  <span className='text-white'>You can manage all the URLs whom are already created</span>
                                        </div>

                                        {
                                                  isLoading ? (<Loader />) : (
                                                            <div className='flex justify-center mx-auto'>
                                                                      <div className="card w-full md:w-[450px] bg-[url('./assets/bg.jpg')] shadow-xl text-white mt-2">
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
                                                  )
                                        }
                                        {
                                                  urlsData?.urls?.length > 0 ? (
                                                            <div className='mt-8 md:mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                                                      {urlsData?.urls?.slice(0).reverse()?.map((item: any, index: number) => {
                                                                                return (
                                                                                          <UrlsCard item={item} key={index} isLoading={isLoading} />
                                                                                )
                                                                      })}
                                                            </div>
                                                  ) : (
                                                            <div className='flex justify-center items-center mt-6'>
                                                                      <div className='card w-full md:w-[370px] bg-[url("./assets/bg2.jpg")] border-2 shadow-xl text-white'>
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
