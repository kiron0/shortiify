import React from 'react'

export default function URLBox() {
          return (
                    <div className='mt-12 md:mt-24'>
                              <div className='flex flex-col justify-center items-center gap-2 text-center text-white'>
                                        <h1 className='text-2xl md:text-5xl'>Hoho!</h1>
                                        <p className='text-xs md:text-lg'>Here are your shortened URLs! Now start rick-rolling your friends.</p>
                              </div>

                              <div className='mt-8 md:mt-12 flex justify-center items-center'>
                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto'>
                                                  <div className="card w-[350px] bg-neutral shadow-xl text-white">
                                                            <div className="card-body">
                                                                      <p>https://facebook.com/toufiqhasankiron</p>
                                                                      <a className='text-secondary' href='/'>https://shortiify.vercel.app/hsTKvX <i className='bx bx-link-external'></i></a>
                                                                      <div className='flex justify-center items-center'>
                                                                                <p className='flex items-center gap-2'><i className='bx bxs-low-vision cursor-pointer text-xl' ></i> 5</p>
                                                                                <p>2 minutes ago</p>

                                                                                <div className='flex items-center gap-3'>
                                                                                          <i className='bx bx-copy cursor-pointer text-secondary text-xl' onClick={() => {
                                                                                                    window.alert("Copied to clipboard!")
                                                                                          }}></i>
                                                                                          <i className='bx bx-trash cursor-pointer text-error text-xl' onClick={() => {
                                                                                                    window.alert("Deleted!")
                                                                                          }}></i>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                                  <div className="card w-[350px] bg-neutral shadow-xl text-white hidden md:flex">
                                                            <div className="card-body">
                                                                      <p>https://github.com/kiron0</p>
                                                                      <a className='text-secondary' href='/'>https://shortiify.vercel.app/ksTlxZ <i className='bx bx-link-external'></i></a>
                                                                      <div className='flex justify-center items-center'>
                                                                                <p className='flex items-center gap-2'><i className='bx bxs-low-vision cursor-pointer text-xl' ></i> 3</p>
                                                                                <p>3 minutes ago</p>

                                                                                <div className='flex items-center gap-3'>
                                                                                          <i className='bx bx-copy cursor-pointer text-secondary text-xl' onClick={() => {
                                                                                                    window.alert("Copied to clipboard!")
                                                                                          }}></i>
                                                                                          <i className='bx bx-trash cursor-pointer text-error text-xl' onClick={() => {
                                                                                                    window.alert("Deleted!")
                                                                                          }}></i>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                                  <div className="card w-[350px] bg-neutral shadow-xl text-white hidden lg:flex">
                                                            <div className="card-body">
                                                                      <p>https://twitter.com/hashtagkiron</p>
                                                                      <a className='text-secondary' href='/'>https://shortiify.vercel.app/eUxbAo <i className='bx bx-link-external'></i></a>
                                                                      <div className='flex justify-center items-center'>
                                                                                <p className='flex items-center gap-2'><i className='bx bxs-low-vision cursor-pointer text-xl' ></i> 6</p>
                                                                                <p>4 minutes ago</p>

                                                                                <div className='flex items-center gap-3'>
                                                                                          <i className='bx bx-copy cursor-pointer text-secondary text-xl' onClick={() => {
                                                                                                    window.alert("Copied to clipboard!")
                                                                                          }}></i>
                                                                                          <i className='bx bx-trash cursor-pointer text-error text-xl' onClick={() => {
                                                                                                    window.alert("Deleted!")
                                                                                          }}></i>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}
