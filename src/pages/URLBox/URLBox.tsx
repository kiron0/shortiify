import React from 'react'
import { toast } from 'react-hot-toast'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../auth/Firebase/firebase.init'
import { useQuery } from '@tanstack/react-query'
import { BASE_API } from '../../config'
import { FaRegEye } from 'react-icons/fa'
import { BsClipboard } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Loader from '../../components/Loader/Loader'

export default function URLBox() {
          const [user] = useAuthState(auth);
          const uid = localStorage.getItem("uid");

          const {
                    data: urlsData,
                    isLoading: urlsLoading,
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

          // Add commas or spaces to group every three digits
          const numberWithCommas = (x: number) => {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }

          if (urlsLoading) return (
                    <Loader />
          )

          return (
                    <div className='mt-12 md:mt-24'>
                              {
                                        user ? (
                                                  <span>
                                                            {
                                                                      urlsData?.urls?.length > 0 ? (
                                                                                <>
                                                                                          <div className='flex flex-col justify-center items-center gap-2 text-center text-white'>
                                                                                                    <h1 className='text-2xl md:text-5xl'>Hoho!</h1>
                                                                                                    <p className='text-xs md:text-lg'>Here are your shortened URLs! Now start rick-rolling your friends. 😆</p>
                                                                                          </div>
                                                                                          <div className='mt-8 md:mt-12 flex flex-col justify-center items-center'>
                                                                                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto'>
                                                                                                              {urlsData?.urls?.slice(-3).reverse().map((item: any, index: number) => {
                                                                                                                        return (
                                                                                                                                  <div className="card w-full bg-[url('./assets/bg.jpg')] shadow-xl text-white" key={index}>
                                                                                                                                            <div className="card-body">
                                                                                                                                                      <p><a href={item?.url} target="_blank" rel="noopener noreferrer">{item?.url.length > 35 ? item?.url?.slice(0, 35) + "..." : item?.url}</a></p>
                                                                                                                                                      <a className='text-primary' href={`${window.location.href}k/${item?.slug}`} target="_blank" rel="noopener noreferrer">{window.location.href}k/{item?.slug} <i className='bx bx-link-external'></i></a>
                                                                                                                                                      <div className='flex justify-center items-center'>
                                                                                                                                                                <p className='flex items-center gap-2'><FaRegEye className='text-lg' />{numberWithCommas(item?.views)} Views</p>
                                                                                                                                                                <div className='flex items-center gap-3'>
                                                                                                                                                                          <CopyToClipboard text={`${window.location.href}k/${item?.slug}`} onCopy={() => {
                                                                                                                                                                                    toast.success('URL Copied To Clipboard..!', {
                                                                                                                                                                                              icon: "✋",
                                                                                                                                                                                              duration: 3000,
                                                                                                                                                                                    });
                                                                                                                                                                          }}>
                                                                                                                                                                                    <BsClipboard className='text-primary text-lg cursor-pointer' />
                                                                                                                                                                          </CopyToClipboard>
                                                                                                                                                                </div>
                                                                                                                                                      </div>
                                                                                                                                                      <p>{item?.createdAt}</p>
                                                                                                                                            </div>
                                                                                                                                  </div>
                                                                                                                        )
                                                                                                              })}
                                                                                                    </div>

                                                                                                    {
                                                                                                              urlsData?.urls?.length > 3 ? (
                                                                                                                        <div className='pt-6 md:pt-10'>
                                                                                                                                  <Link to="/dashboard/allLinks"><button className="btn bg-[url('./assets/bg.jpg')] text-white">See All Links</button></Link>
                                                                                                                        </div>
                                                                                                              ) : null
                                                                                                    }
                                                                                          </div>
                                                                                </>
                                                                      ) : (
                                                                                <div className='flex justify-center items-center mt-10'>
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
