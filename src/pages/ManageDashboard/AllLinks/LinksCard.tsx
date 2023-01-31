import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-hot-toast'
import Swal from "sweetalert2";
import { BASE_API } from '../../../config'
import Loader from '../../../components/Loader/Loader'
import { FaRegEye } from 'react-icons/fa';
import { BsClipboard } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';

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

          // Add commas or spaces to group every three digits
          const numberWithCommas = (x: number) => {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }

          if (isLoading) return (
                    <Loader />
          )

          return (
                    <div className="card w-full shadow-lg bg-[url('./assets/bg.jpg')]">
                              <div className="card-body">
                                        <p className='text-white'><a href={item?.url} target="_blank" rel="noopener noreferrer">{item?.url.length > 35 ? item?.url?.slice(0, 35) + "..." : item?.url}</a></p>
                                        <p><a className='text-primary flex items-center gap-2' href={`${window.location.origin}/k/${item?.slug}`} target="_blank" rel="noopener noreferrer">{window.location.origin}/k/{item?.slug} <FiExternalLink /></a></p>
                                        <div className='flex justify-center items-center'>
                                                  <p className='flex items-center gap-2 text-white'><FaRegEye className='text-lg' />{numberWithCommas(item?.views)} Views</p>

                                                  <div className='flex items-center gap-3'>
                                                            <CopyToClipboard text={`${window.location.href}k/${item?.slug}`} onCopy={() => {
                                                                      toast.success('URL Copied To Clipboard..!', {
                                                                                icon: "✋",
                                                                                duration: 3000,
                                                                      });
                                                            }}>
                                                                      <BsClipboard className='text-primary text-lg cursor-pointer' />
                                                            </CopyToClipboard>
                                                            <i className='bx bx-trash cursor-pointer text-error text-xl' onClick={deleteUrl}></i>
                                                  </div>
                                        </div>
                                        <p className='text-white'>{item?.createdAt}</p>
                              </div>
                    </div>
          )
}
