import React from 'react'
import { BASE_API } from '../../../config';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import LinksCard from './LinksCard';

export default function AllLinks() {
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
          return (
                    <div>
                              {
                                        urlsData?.urls?.length > 0 ? (
                                                  <div className='mt-8 md:mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                                            {urlsData?.urls?.slice(0).reverse()?.map((item: any, index: number) => {
                                                                      return (
                                                                                <LinksCard item={item} key={index} />
                                                                      )
                                                            })}
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
                    </div>
          )
}
