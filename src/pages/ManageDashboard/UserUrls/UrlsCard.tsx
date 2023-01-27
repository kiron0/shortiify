import React from 'react'
import Loader from '../../../components/Loader/Loader'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-hot-toast'

type Props = {
          item: any,
          refetch: any,
          isLoading: boolean
}

export default function UrlsCard({ item, refetch, isLoading }: Props) {

          if (isLoading) return (
                    <Loader />
          )
          return (
                    <div className="card w-full bg-base-100 shadow-lg">
                              <div className="card-body">
                                        <p><a href={item?.url} target="_blank" rel="noopener noreferrer">{item?.url.length > 35 ? item?.url?.slice(0, 35) + "..." : item?.url}</a></p>
                                        <a className='text-secondary' href={`${window.location.origin}/k/${item?.slug}`} target="_blank" rel="noopener noreferrer">{window.location.origin}/k/{item?.slug} <i className='bx bx-link-external'></i></a>
                                        <div className='flex justify-center items-center'>
                                                  <p>{item?.createdAt}</p>

                                                  <div className='flex items-center gap-3'>
                                                            <CopyToClipboard text={`${window.location.origin}/k/${item?.slug}`} onCopy={() => {
                                                                      toast.success('URL Copied To Clipboard..!', {
                                                                                icon: "✋",
                                                                                duration: 3000,
                                                                      });
                                                            }}>
                                                                      <i className='bx bx-copy cursor-pointer text-secondary text-xl'></i>
                                                            </CopyToClipboard>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}
