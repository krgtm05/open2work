import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import JobCard from "../JobCard";
import UserCard from "../UserCard";
import Navbar from "../../Components/Navbar";
import Spinner from "../../Components/Spinner";
import AboutComp from "../AboutComp";

function CandidateFeed() {
  const [alljobs, setAlljobs] = useState([]);
  const [allusers, setAllusers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [JobsAsideStatus, setJobAsideStatus] = useState(true);
  const [UsersAsideStatus, setUsersAsideStatus] = useState(true);
  const [about, setAbout] = useState(true);
  const [applications, setApplications] = useState([]);
  const [myApplicationsStatus, setMyApplicationsStatus] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchJobs() {
      try {
        const res = await axios.get("/api/alljobs", {
          headers: {
            token: token,
          },
        });
        setIsLoading(!isLoading);
        setAlljobs(res.data.alljobs);
      } catch (e) {
        console.log("Failed to fetch jobs:", e);
      }
    }
    setUsersAsideStatus(false);
    setAbout(false);
    setMyApplicationsStatus(false);
    fetchJobs();
  }, []);

  async function fetchUsers() {
    setJobAsideStatus(false);
    setAbout(false);
    setUsersAsideStatus(true);
    setMyApplicationsStatus(false);

    const res = await axios.get("/api/allusers", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    setAllusers(res.data.allusers);
  }

  function fetchAbout() {
    setJobAsideStatus(false);
    setUsersAsideStatus(false);
    setMyApplicationsStatus(false);
    setAbout(true);
  }
  async function fetchMyApplications() {
    try {
      const res = await axios.get("/api/my-applications", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setApplications(res.data.appliedJobs);
      setMyApplicationsStatus(true);
      setJobAsideStatus(false);
      setUsersAsideStatus(false);
      setAbout(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Navbar />
      <div className='pt-20 container'>
        <button
          data-drawer-target='logo-sidebar'
          data-drawer-toggle='logo-sidebar'
          aria-controls='logo-sidebar'
          type='button'
          className='inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:border-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        >
          <span className='sr-only'>Open sidebar</span>
          <svg
            className='w-6 h-6'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              clipRule='evenodd'
              fillRule='evenodd'
              d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
            ></path>
          </svg>
        </button>
        <aside
          id='logo-sidebar'
          className='fixed z-40 w-64 h-[75%] transition-transform -translate-x-full sm:translate-x-0'
          aria-label='Sidebar'
        >
          <div className='h-full px-3 py-4 rounded overflow-y-auto bg-gray-900/60 border-2 border-gray-900'>
            <div className='flex items-center ps-2.5 mb-5'>
              <img
                src='https://flowbite.com/docs/images/logo.svg'
                className='h-6 me-3 sm:h-7'
                alt='Flowbite Logo'
              />
              <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                Open2Work
              </span>
            </div>
            <ul className='space-y-2 font-medium'>
              <li
                onClick={() => {
                  setJobAsideStatus(true);
                  setUsersAsideStatus(false);
                  setAbout(false);
                  setMyApplicationsStatus(false);
                }}
              >
                <div className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                  <svg
                    className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 22 21'
                  >
                    <path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
                    <path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
                  </svg>
                  <span className='ms-3'>Available Jobs</span>
                </div>
              </li>
              <li onClick={fetchMyApplications}>
                <div className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                  <svg
                    className='shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 18'
                  >
                    <path d='M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z' />
                  </svg>
                  <span className='flex-1 ms-3 whitespace-nowrap'>
                    My Applications
                  </span>
                </div>
              </li>
              <li onClick={fetchUsers}>
                <div className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                  <svg
                    className='shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 18'
                  >
                    <path d='M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z' />
                  </svg>
                  <span className='flex-1 ms-3 whitespace-nowrap'>Users</span>
                </div>
              </li>

              <li onClick={fetchAbout}>
                <div className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                  <svg
                    className='shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z' />
                    <path d='M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z' />
                    <path d='M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z' />
                  </svg>
                  <span className='flex-1 ms-3 whitespace-nowrap'>About</span>
                </div>
              </li>
            </ul>
          </div>
        </aside>

        <div className='sm:ml-64 px-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-scroll h-[calc(100vh-10px)] will-change-scroll pb-40 scrollbar-hide'>
          {isLoading && <Spinner />}
          {JobsAsideStatus &&
            alljobs.map((job) => (
              <JobCard key={job._id} job={job} tab={"Jobs"} />
            ))}
          {UsersAsideStatus &&
            allusers.map((user) => <UserCard key={user._id} user={user} />)}
          {myApplicationsStatus && applications.length === 0
            ? "You have not applied to any job yes"
            : applications
                .filter((ele) => ele.jobId !== null)
                .map((ele) => (
                  <JobCard
                    key={ele._id}
                    job={ele.jobId}
                    tab={"Applications"}
                    onDelete={fetchMyApplications}
                  />
                ))}
          {about && <AboutComp />}
        </div>
      </div>
    </>
  );
}

export default CandidateFeed;
