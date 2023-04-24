import React, { useEffect, useState } from 'react'
import { BASE_API } from '../../../config';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import LinksCard from './LinksCard';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import useTitle from '../../../hooks/useTitle';
import useScrollToTop from '../../../hooks/useScrollToTop';
import Pagination from './Pagination';

export default function YourUrls() {
          useTitle("Manage Your URLs")
          useScrollToTop();
          const uid = localStorage.getItem("uid");
          const [pageLoading, setPageLoading] = useState(false);
          const [page, setPage] = useState(1);
          const [size] = useState(9);

          const {
                    data: urlsData = [],
                    isLoading,
                    refetch,
          } = useQuery(["urls"], () =>
                    fetch(`${BASE_API}/user/urls?uid=${uid}&page=${page}&limit=${size}`, {
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

          useEffect(() => {
                    setPageLoading(true);
                    refetch();
                    setPageLoading(false);
          }, [page, refetch]);

          const totalPages = urlsData?.totalPages;

          if (isLoading || pageLoading) return (
                    <Loading />
          )

          return (
                    <div className='pb-6 md:pb-0'>
                              <div className="title mt-3 md:mt-8 md:mx-8">
                                        <h3 className="text-2xl font-semibold text-white">Manage Your URLs</h3>
                                        <span className='text-white'>You can manage all the URLs whom are already created</span>
                              </div>
                              {
                                        urlsData?.urls?.length > 0 ? (
                                                  <div className='mt-8 md:mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                                            {urlsData?.urls?.map((item: any, index: number) => {
                                                                      return (
                                                                                <LinksCard item={item} key={index} refetch={refetch} isLoading={isLoading} />
                                                                      )
                                                            })}
                                                  </div>
                                        ) : (
                                                  <div className='flex justify-center items-center mt-6'>
                                                            <div className="card w-full md:w-[370px] border text-white">
                                                                      <div className="card-body">
                                                                                <p className='text-center'>No URLs have been shortened!</p>
                                                                      </div>
                                                                      <div className='flex justify-center items-center pb-6'>
                                                                                <Link to="/"><button className='btn btn-sm btn-primary'>Go to Home</button></Link>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        )
                              }

                              {
                                        urlsData?.urls?.length > 0 && (
                                                  <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                                        )
                              }
                    </div>
          )
}
