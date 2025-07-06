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
    <div className='container h-screen flex justify-center align-center'>
      <div className='grid grid-cols-2 gap-4'>
        <button
          onClick={() => handleRoleSelect("employer")}
          className='bg-blue-900 col-span-1'
        >
          I am an Employer
        </button>
        <button
          onClick={() => handleRoleSelect("candidate")}
          className='bg-blue-900 col-span-1'
        >
          I am a Candidate
        </button>
        <button
          onClick={() => handleLogin()}
          className='bg-green-900 col-span-2 h-[5rem]'
        >
          Login
        </button>
      </div>
    </div>
  );
}
