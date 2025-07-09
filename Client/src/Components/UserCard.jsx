import React from "react";

function UserCard({ user }) {
  return (
    <div className='grid grid-cols-3 min-w-full p-6 bg-gray-900/60 border-2 border-gray-900 rounded-lg shadow-sm hover:border-primary-300/30'>
      <div className='col-span-2'>
        <div className='flex flex-row gap-2'>
          <p className='mb-2 tracking-tight text-gray-900 dark:text-white'>
            <b>Name:</b>
          </p>
          <p> {user.fullName} </p>
        </div>
        <div className='flex flex-row gap-2'>
          <p className='mb-2 tracking-tight text-gray-900 dark:text-white'>
            <b>Email Id: </b>
          </p>
          <p>{user.email} </p>
        </div>
        <div className='flex flex-row gap-2'>
          <p className='mb-2 tracking-tight text-gray-900 dark:text-white'>
            <b>Role:</b>
          </p>
          <p>{user.role[0].toUpperCase() + user.role.slice(1)} </p>
        </div>
      </div>
      <div className='col-span-1 flex flex-col justify-between items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-14'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
          />
        </svg>
        <button
          onClick={() => {
            alert("Upcoming feature");
          }}
          className='inline-flex gap-2 items-center px-3 py-1 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-primary-700'
        >
          Connect
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default UserCard;
