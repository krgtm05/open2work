import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Nav() {
  const [userIcon, setUserIcon] = useState(false);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }

  async function fetchMyUserDetail() {
    try {
      const res = await axios.get("/api/me", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setProfile(res.data.profile);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  function handleUserIcon() {
    setUserIcon(!userIcon);
    fetchMyUserDetail();
  }

  return (
    <div className='top-0 z-50'>
      <nav className='bg-gray-900/60 border-2 border-gray-900/60 rounded-lg'>
        <div className='flex flex-wrap items-center justify-between p-4'>
          <div className='flex items-center'>
            <img
              src='https://flowbite.com/docs/images/logo.svg'
              className='h-8'
              alt='Logo'
            />
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
              Open2Work
            </span>
          </div>
          <div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
            <button
              onClick={handleUserIcon}
              type='button'
              className='flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 mx-28'
              id='user-menu-button'
              aria-expanded='false'
              data-dropdown-toggle='user-dropdown'
              data-dropdown-placement='bottom'
            >
              <span className='sr-only'>Open user menu</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-8'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
            </button>
            {/* Dropdown menu */}
            <div
              className={`${
                userIcon ? "absolute" : "hidden"
              }  z-50  top-14 mr-94 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600`}
              id='user-dropdown'
            >
              <div className='px-4 py-3'>
                <span className='block text-sm text-gray-900 dark:text-white'>
                  {profile.fullName}
                </span>
                <span className='block text-sm  text-gray-500 truncate dark:text-gray-400'>
                  {profile.email}
                </span>
              </div>
              <ul className='py-2'>
                <li onClick={handleLogOut}>
                  <p className='cursor-pointer px-4 py-2 text-md-bold text-red-400 hover:text-red-500 font-bold'>
                    Sign out
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
            id='navbar-user'
          >
            <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700'>
              <li>
                <a
                  className='block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                  aria-current='page'
                >
                  Home
                </a>
              </li>

              <li onClick={() => alert("Upcoming feature")}>
                <a className='block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                  Internships
                </a>
              </li>

              <li onClick={() => alert("Upcoming feature")}>
                <a className='block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
