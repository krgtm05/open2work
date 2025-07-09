import React from "react";

function UserCard({ user }) {
  return (
    <div className='flex items-center justify-start'>
      <div className='min-w-full p-6 bg-gray-900/60 border-2 border-gray-900 rounded-lg shadow-sm hover:border-primary-300/30'>
        <p className='mb-2 tracking-tight text-gray-900 dark:text-white'>
          <b>Name:</b> {user.fullName} <br />
          <b>Email Id:</b> {user.email} <br />
          <b>Role:</b> {user.role[0].toUpperCase() + user.role.slice(1)}
        </p>
      </div>
    </div>
  );
}

export default UserCard;
