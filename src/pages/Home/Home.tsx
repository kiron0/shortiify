import React from 'react'
import URLBox from '../URLBox/URLBox';

export default function Home() {

          const submitForm = (e: any) => {
                    e.preventDefault();
                    window.alert("Form Submitted!")
          }

          return (
                    <div className='mt-12 md:mt-24'>
                              <div className='text-center text-white flex flex-col gap-2 justify-center items-center'>
                                        <h1 className='text-2xl md:text-5xl'>Shorten your <span className='text-secondary'>loooooong</span> URLs</h1>
                                        <h1 className='text-2xl md:text-5xl'>like never before!</h1>
                                        <p className='text-sm md:text-md'>Copy your long URL. Paste it below. Then You got it, right?</p>
                              </div>

                              <div>
                                        <form onSubmit={submitForm}>
                                                  <div className="form-control w-full max-w-lg flex mx-auto mt-12">
                                                            <label className="label px-9 md:px-6">
                                                                      <span className="label-text text-white">Your Long URL</span>
                                                            </label>
                                                            <div className='flex flex-col md:flex-row justify-center items-center gap-3'>
                                                                      <input type="text" placeholder="Type here" className="input w-full max-w-xs bg-transparent border-1 border-white text-white" />
                                                                      <button className='btn'>Shorten URL</button>
                                                            </div>
                                                            <p className='text-white text-center mt-3 text-xs'>React, Redux & Typescript powered URL Shortener</p>
                                                  </div>
                                        </form>
                              </div>

                              <URLBox />
                    </div>
          )
}
