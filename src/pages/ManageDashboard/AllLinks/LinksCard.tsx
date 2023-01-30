import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-hot-toast'
import Swal from "sweetalert2";
import { BASE_API } from '../../../config'
import Loader from '../../../components/Loader/Loader'

type Props = {
          item: any,
          refetch: any,
          isLoading: boolean
}

export default function LinksCard({ item, refetch, isLoading }: Props) {
          const deleteUrl = () => {
                    Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Yes, delete it!",
                    }).then((willDelete: any) => {
                              if (willDelete.isConfirmed) {
                                        const uid = localStorage.getItem("uid");
                                        fetch(`${BASE_API}/user/url/delete?uid=${uid}&&slug=${item?.slug}`, {
                                                  method: "DELETE",
                                                  headers: {
                                                            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                                  },
                                        }).then((res) => res.json()).then((data) => {
                                                  if (data?.error) {
                                                            toast.error(data?.error);
                                                            return;
                                                  }
                                                  toast.success(data?.message);
                                                  refetch();
                                        })
                              }
                    });

          }

          if (isLoading) return (
                    <Loader />
          )

          return (
                    <div className="card w-full shadow-lg bg-[url('./assets/bg.jpg')]">
                              <div className="card-body">
                                        <p className='text-white'><a href={item?.url} target="_blank" rel="noopener noreferrer">{item?.url.length > 35 ? item?.url?.slice(0, 35) + "..." : item?.url}</a></p>
                                        <a className='text-primary' href={`${window.location.origin}/k/${item?.slug}`} target="_blank" rel="noopener noreferrer">{window.location.origin}/k/{item?.slug} <i className='bx bx-link-external'></i></a>
                                        <div className='flex justify-center items-center'>
                                                  <p className='text-white'>{item?.createdAt}</p>

                                                  <div className='flex items-center gap-3'>
                                                            <CopyToClipboard text={`${window.location.origin}/k/${item?.slug}`} onCopy={() => {
                                                                      toast.success('URL Copied To Clipboard..!', {
                                                                                icon: "✋",
                                                                                duration: 3000,
                                                                      });
                                                            }}>
                                                                      <i className='bx bx-copy cursor-pointer text-primary text-xl'></i>
                                                            </CopyToClipboard>
                                                            <i className='bx bx-trash cursor-pointer text-error text-xl' onClick={deleteUrl}></i>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}
