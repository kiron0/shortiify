import React from 'react'
import { BASE_API } from '../../../config';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import LinksCard from './LinksCard';
import { Link } from 'react-router-dom';

export default function AllLinks() {
          const uid = localStorage.getItem("uid");
          const {
                    data: urlsData = [],
                    isLoading,
                    refetch,
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
          return (
                    <div>
                              <div className="title mt-3 md:mt-8 md:mx-8">
                                        <h3 className="text-2xl font-semibold text-white">Manage URLs</h3>
                                        <span className='text-white'>You can manage all the URLs whom are already created</span>
                              </div>
                              {
                                        urlsData?.urls?.length > 0 ? (
                                                  <div className='mt-8 md:mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                                            {urlsData?.urls?.slice(0).reverse()?.map((item: any, index: number) => {
                                                                      return (
                                                                                <LinksCard item={item} key={index} refetch={refetch} isLoading={isLoading} />
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
          )
}
