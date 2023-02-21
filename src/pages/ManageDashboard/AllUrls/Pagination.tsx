import React from 'react'

export default function Pagination() {
          return (
                    <div className='flex justify-center items-center mb-5 mt-10'>
                              <div className="btn-group">
                                        <button className="btn btn-sm btn-primary">1</button>
                                        <button className="btn btn-sm">2</button>
                                        <button className="btn btn-sm btn-disabled">...</button>
                                        <button className="btn btn-sm">99</button>
                                        <button className="btn btn-sm btn-primary">100</button>
                              </div>
                    </div>
          )
}
