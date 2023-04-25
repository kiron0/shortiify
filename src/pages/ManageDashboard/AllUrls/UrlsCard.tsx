import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-hot-toast'
import { BsClipboardHeart } from 'react-icons/bs';
import { FaRegEye } from 'react-icons/fa';
import Loading from '../../../components/Loading/Loading';

type UrlsListProps = {
          url: any;
          loading: boolean
};

export default function UrlsCard({ url, loading }: UrlsListProps) {

          // Add commas or spaces to group every three digits
          const numberWithCommas = (x: number) => {
                    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }

          if (loading) return (
                    <Loading />
          )
          return (
                    <div className="card w-full bg-[url('./assets/bg.jpg')]">
                              <div className="card-body">
                                        <p className='text-white'><a href={url?.url} target="_blank" rel="noopener noreferrer">{url?.url?.length > 35 ? url?.url?.slice(0, 35) + "..." : url?.url}</a></p>
                                        <p><a className='text-primary flex items-center gap-2 w-48' href={`${window.location.origin}/k/${url?.slug}`} target="_blank" rel="noopener noreferrer">{window.location.origin}/k/{url?.slug}</a></p>
                                        <div className='flex justify-center items-center'>
                                                  <p className='flex items-center gap-2 text-white'><FaRegEye className='text-lg' />{numberWithCommas(url?.views)} Views</p>
                                                  <div className='flex items-center gap-3'>
                                                            <CopyToClipboard text={`${window.location.origin}/k/${url?.slug}`} onCopy={() => {
                                                                      toast.success('URL Copied To Clipboard..!', {
                                                                                icon: "✋",
                                                                                duration: 3000,
                                                                      });
                                                            }}>
                                                                      <BsClipboardHeart className='text-primary text-lg cursor-pointer' />
                                                            </CopyToClipboard>
                                                  </div>
                                        </div>
                                        <p className='text-white'>{url?.createdAt}</p>
                              </div>
                    </div>
          )
}
