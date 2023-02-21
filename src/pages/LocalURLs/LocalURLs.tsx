import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { InitializeContext } from '../../App'
import LocalCard from './LocalCard'
import useScrollToTop from '../../hooks/useScrollToTop'
import useTitle from '../../hooks/useTitle'

export default function LocalURLs() {
  useScrollToTop();
  useTitle('Manage Local URLs')
  const { isLoading, refetch } = useContext(InitializeContext)
  const [urlsData, setUrlsData] = useState<any>(JSON.parse(localStorage.getItem('localURLs') || '[]'))
  const navigate = useNavigate();

  useEffect(() => {
    setUrlsData(JSON.parse(localStorage.getItem('localURLs') || '[]'))
  }, [])

  return (
    <div className='pb-6 md:pb-0 px-2 bg-[url("./assets/bg2.jpg")] h-screen'>
      <div className="title pt-3 md:pt-8 md:mx-8">
        <span className='flex items-center gap-2'>
          <i className='bx bxs-left-arrow cursor-pointer text-white text-xl md:text-2xl' onClick={() => navigate(-1)}></i>
          <h3 className="text-2xl font-semibold text-white">Manage URLs</h3>
        </span>
        <span className='text-white'>You can manage all the URLs whom are already created</span>
      </div>
      {
        urlsData?.length > 0 ? (
          <div className='mt-8 md:mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {urlsData?.slice(0).reverse()?.map((item: any, index: number) => {
              return (
                <LocalCard item={item} key={index} refetch={refetch} isLoading={isLoading} />
              )
            })}
          </div>
        ) : (
          <div className='flex justify-center items-center mt-6'>
            <div className='card w-full md:w-[370px] bg-[url("./assets/bg2.jpg")] border-2 shadow-xl text-white'>
              <div className="card-body">
                <p className='text-center'>No URLs found!</p>
              </div>
              <div className='flex justify-center items-center pb-6'>
                <Link to="/"><button className='btn btn-sm btn-primary'>Go to Home</button></Link>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
