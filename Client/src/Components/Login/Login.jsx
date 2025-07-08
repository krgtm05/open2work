import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  async function handleOnLoginSubmit() {
    try {
      const res = await axios.post("/api/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", res.data.token);
      const profileRes = await axios.get("/api/me", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      // Store role and any other user info
      console.log("Profile Response:", profileRes.data);
      localStorage.setItem("role", profileRes.data.profile.role);
      navigate("/feed");
    } catch {
      alert("User Not Found or Invalid Credentials");
      //   console.error("Login failed", error);
    }
  }
  return (
    <section className='container'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a
          href='#'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
        >
          <img
            className='w-8 h-8 mr-2'
            src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
            alt='logo'
          />
          Open2Work
        </a>
        <div className='w-full bg-gray-900/60 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 '>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Login to continue
            </h1>
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
            <button
              disabled={!isFormValid}
              onClick={handleOnLoginSubmit}
              type='submit'
              className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  '
            >
              Login
            </button>
            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
              Don't have an account?{" "}
              <Link
                to='/'
                className='font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                SignUp now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
