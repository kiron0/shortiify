import React from 'react'
import { toast } from 'react-hot-toast'

type Props = {
          item: any
}

export default function LinksCard({ item }: Props) {
          return (
                    <div className="card w-[350px] bg-base-100 shadow-lg">
                              <div className="card-body">
                                        <p><a href={item?.url} target="_blank" rel="noopener noreferrer">{item?.url.length > 35 ? item?.url?.slice(0, 35) + "..." : item?.url}</a></p>
                                        <a className='text-secondary' href={`${window.location.origin}/k/${item?.slug}`}>{window.location.origin}/k/{item?.slug} <i className='bx bx-link-external'></i></a>
                                        <div className='flex justify-center items-center'>
                                                  <p>{item?.createdAt}</p>

                                                  <div className='flex items-center gap-3'>
                                                            <i className='bx bx-copy cursor-pointer text-secondary text-xl' onClick={() => {
                                                                      toast.success("Copied to clipboard!")
                                                            }}></i>
                                                            <i className='bx bx-trash cursor-pointer text-error text-xl' onClick={() => {
                                                                      toast.success("Deleted Successfully!")
                                                            }}></i>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}
