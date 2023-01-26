import React from 'react'

export default function Navbar() {
  return (
    <div className="navbar container mx-auto">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl text-white" href='/'><i className='bx bx-expand text-3xl text-secondary mr-3' ></i>Shortiify</a>
      </div>
      <div className="flex-none">
        <h2 className='text-white mr-2'>Hi, Toufiq!</h2>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://i.ibb.co/6FhzMwK/kiron3.jpg" alt='' />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between" href='/'>
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a href='/'>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
