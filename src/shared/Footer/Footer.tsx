import React, { useContext } from 'react'
import { InitializeContext } from '../../App';
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Footer() {
          const { appName } = useContext(InitializeContext);
          return (
                    <div className="mt-20">
                              <div className="max-w-2xl mx-auto text-white py-10">
                                        <div className="text-center">
                                                  <h3 className="text-3xl mb-3">{appName}</h3>
                                                  <p>A URL Shortener Web App</p>
                                                  <div className="flex justify-center items-center gap-5 mt-6">
                                                            <a href='https://twitter.com/hashtagkiron' target='_blank' rel="noopener noreferrer" className="bg-white hover:bg-transparent hover:border duration-300 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none" type="button">
                                                                      <BsTwitter className='text-blue-400 text-xl' />
                                                            </a>
                                                            <a href='https://facebook.com/toufiqhasankiron' target='_blank' rel="noopener noreferrer" className="bg-white hover:bg-transparent hover:border duration-300 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none" type="button">
                                                                      <BsFacebook className='text-blue-500 text-xl' />
                                                            </a>
                                                            <a href='https://github.com/kiron0' target='_blank' rel="noopener noreferrer" className="bg-white hover:bg-transparent hover:border duration-300 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none" type="button">
                                                                      <BsGithub className='text-black text-xl' />
                                                            </a>
                                                            <a href='https://instagram.com/toufiq_hasan_kiron' target='_blank' rel="noopener noreferrer" className="bg-white hover:bg-transparent hover:border duration-300 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none" type="button">
                                                                      <BsInstagram className='text-pink-500 text-xl' />
                                                            </a>
                                                  </div>
                                        </div>
                                        <div className="mt-12 flex flex-col md:flex-row justify-center items-center text-sm text-white">
                                                  <Link to='/pages/terms&Conditions' className='px-2'>Terms & Conditions</Link>
                                                  <Link to='/pages/privacyPolicy' className='px-2 md:border-l'>Privacy Policy</Link>
                                                  <Link to='/pages/about' className='px-2 md:border-l'>About</Link>
                                                  <Link to='/pages/contact' className='px-2 md:border-l'>Contact</Link>
                                        </div>

                                        <div className='flex flex-col justify-center items-center pt-6'>
                                                  <p className='text-xs md:text-sm'>Copyright &copy; {new Date().getFullYear()} <span className='text-primary font-bold'>{appName}</span> - All Rights reserved.</p>
                                                  <p className='text-xs'>Developed by <a href="https://toufiqhasankiron.me" target="_blank" rel="noopener noreferrer"><span className='text-primary font-bold hover:text-white'>Toufiq Hasan Kiron</span></a></p>
                                        </div>
                              </div>
                    </div>
          )
}
