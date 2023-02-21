import React from 'react'

export default function Footer() {
          return (
                    <div className="w-full mx-auto text-center text-white bg-transparent">
                              <div className='flex flex-col justify-center items-center py-6'>
                                        <small className='font-semibold'>Copyright &copy; {new Date().getFullYear()} - All rights reserved.</small>
                                        <small>Developed by <a href="https://toufiqhasankiron.me" target="_blank" rel="noopener noreferrer"><span className='text-primary font-goodVibrationsScript hover:text-white'>Toufiq Hasan Kiron</span></a></small>
                              </div>
                    </div>
          )
}
