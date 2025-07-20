import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem("role", role);
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <section className='container'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 md:h-screen text-white '>
        <h1 className='text-2xl md:text-5xl mb-10  font-bold'>
          Open<span className='text-primary-400'>2</span>Work
        </h1>
        <div className='w-[80%]'>
          <h3 className='bg-yellow-400 flex justify-around items-center text-black  p-3 md:p-5 rounded-full w-[50%] md:w-[20%] mb-2'>
            Sign Up as{" "}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-4 md:size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3'
              />
            </svg>
          </h3>
        </div>
        <div className='grid grid-cols-2 gap-4 w-[80%]'>
          <button
            onClick={() => handleRoleSelect("employer")}
            className='flex flex-col justify-center items-start bg-gray-900/60 border border-gray-600  col-span-2  rounded-lg p-5 hover:bg-gray-900/90 md:col-span-1'
          >
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-10 md:size-20'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z'
                />
              </svg>
            </div>
            <div className='flex flex-row justify-between items-end w-[80%]'>
              <span className='text-2xl md:text-5xl font-bold'>Employer</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 md:size-12'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3'
                />
              </svg>
            </div>
          </button>
          <button
            onClick={() => handleRoleSelect("candidate")}
            className='flex flex-col justify-center items-start bg-gray-900/60 border border-gray-600  col-span-2  rounded-lg p-5 md:h-[20rem] hover:bg-gray-900 md:col-span-1'
          >
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-10 md:size-20'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                />
              </svg>
            </div>
            <div className='flex flex-row justify-between items-end w-[80%]'>
              <span className='text-2xl md:text-5xl font-bold'>Candidate</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 md:size-12'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3'
                />
              </svg>
            </div>
          </button>
          <p className='col-span-2 flex justify-center items-center'>Or</p>
          <button
            onClick={() => handleLogin()}
            className='bg-primary-600 hover:bg-primary-700 col-span-2 h-[3rem] rounded-lg'
          >
            Already has an account? Login
          </button>
        </div>
      </div>
    </section>
  );
}
