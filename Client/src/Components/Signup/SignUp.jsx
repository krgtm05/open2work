import React from "react";
import { useState } from "react";
import axios from "../../axios.js";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const navigate = useNavigate();

  const isFormValid = email.trim() !== "" && password.trim() !== "";
  const isMatch = password === confirmPassword && password.length > 0;

  async function handleOnSignupSubmit() {
    if (!isMatch) {
      alert("Password didn't match");
      return;
    }
    try {
      const res = await axios.post("/api/signup", {
        fullName: fullName,
        email: email,
        password: password,
        role: localStorage.getItem("role"),
      });
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      // On success, navigate to complete-profile page
      navigate("/complete-profile");
    } catch (error) {
      console.error("Signup failed", error);
    }
  }
  return (
    <section className='container'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a
          href='#'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
        >
          
          Open2Work
        </a>
        <div className='w-full bg-gray-900/60 md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Create an account
            </h1>
            <div>
              <label
                htmlFor='fullName'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Full Name
              </label>
              <input
                type='text'
                name='fullName'
                id='fullName'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Jon Doe'
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Your email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='name@company.com'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor='confirm-password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Confirm password
              </label>
              <input
                type='confirm-password'
                name='confirm-password'
                id='confirm-password'
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              disabled={!isFormValid}
              onClick={handleOnSignupSubmit}
              type='submit'
              className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  '
            >
              Create an account
            </button>
            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
              Already have an account?{" "}
              <Link
                to='/login'
                className='font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
