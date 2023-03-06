import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-hot-toast'
import Swal from "sweetalert2";
import { FaRegEye } from 'react-icons/fa';
import { BsClipboard } from 'react-icons/bs';
import Loading from '../../components/Loading/Loading';

type Props = {
          item: any,
          refetch: any,
          isLoading: boolean
}

export default function LocalCard({ item, refetch, isLoading }: Props) {

          const deleteUrl = () => {
                    Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              background: "#333",
                              color: "#fff",
                              showCancelButton: true,
                              confirmButtonText: "Yes, delete it!",
                    }).then((willDelete: any) => {
                              if (willDelete.isConfirmed) {
                                        // Delete URL from local storage
                                        const localUrls = JSON.parse(localStorage.getItem('localURLs') || '[]');
                                        const newUrls = localUrls.filter((url: any) => url.slug !== item?.slug);
                                        localStorage.setItem('localURLs', JSON.stringify(newUrls));
                                        toast.success('URL Deleted Successfully..!', {
                                                  icon: "🗑️",
                                                  duration: 3000,
                                        });
                                        window.location.reload();
                              }
                    });

          }

          // Add commas or spaces to group every three digits
          const numberWithCommas = (x: number) => {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }

          if (isLoading) return (
                    <Loading />
          )

          return (
                    <div className="card w-full bg-[url('./assets/bg.jpg')]">
                              <div className="card-body">
                                        <p className='text-white'><a href={item?.url} target="_blank" rel="noopener noreferrer">{item?.url.length > 35 ? item?.url?.slice(0, 35) + "..." : item?.url}</a></p>
                                        <p><a className='text-primary flex items-center gap-2 w-48' href={`${window.location.origin}/l/${item?.slug}`} target="_blank" rel="noopener noreferrer">{window.location.origin}/l/{item?.slug}</a></p>
                                        <div className='flex justify-center items-center'>
                                                  <p className='flex items-center gap-2 text-white'><FaRegEye className='text-lg' />{numberWithCommas(item?.views)} Views</p>
                                                  <div className='flex items-center gap-3'>
                                                            <CopyToClipboard text={`${window.location.origin}/l/${item?.slug}`} onCopy={() => {
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
