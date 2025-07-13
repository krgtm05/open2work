import axios from "../../axios.js";
import { useState, useEffect } from "react";
import Spinner from "../Spinner";

function CandidateFeed() {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [applicationCount, setApplicationCount] = useState(0);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const token = localStorage.getItem("token");

        const [profileRes, appRes] = await Promise.all([
          axios.get("/api/me", { headers: { token } }),
          axios.get("/api/my-applications", { headers: { token } }),
        ]);

        setProfile(profileRes.data.profile);
        setApplicationCount(appRes.data.appliedJobs.length);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setIsLoading(false);
      }
    }

    fetchAllData();
  }, []);
  return (
    <div className='border-2 border-gray-700/50 rounded-lg h-[70vh]'>
      <div className='h-full grid grid-cols-3 gap-4 items-center justify-center rounded-lg p-4'>
        <div className='flex flex-col justify-center items-center col-span-3 p-4 rounded-lg border-2 border-gray-900/80 bg-gray-900/60'>
          {isLoading && <Spinner />}
          <h1 className='text-4xl font-bold'>{profile.userId?.fullName}</h1>
          <h1 className='text-sm text-gray-500'>{profile.userId?.email}</h1>
        </div>
        <div className='h-[30vh] col-span-2  p-4 bg-gray-900/60 rounded-lg border-2 border-gray-900/80 '>
          {isLoading && <Spinner />}
          <p>
            <b>Organization</b>: {profile.organizationName}
          </p>
          <p>
            <b>Location</b>: {profile.location}
          </p>
          <p>
            <b>About</b>: {profile.about}
          </p>
          <p>
            <b>Experience</b>: {profile.experience}
          </p>
        </div>
        <div className='h-[30vh] col-span-1 flex flex-col justify-between items-center  rounded-lg border-2 border-primary-400  '>
          <div className='h-[90%] flex flex-col items-center justify-center '>
            {isLoading && <Spinner />}
            <h1 className='text-9xl font-bold'>{applicationCount}</h1>
          </div>
          <p className='bg-green-400 w-full text-center p-2 rounded-b text-gray-900 '>
            {" "}
            <b>Applied Jobs</b>
          </p>
        </div>
        <div className='col-span-3  p-4 border-2 rounded-lg border-gray-900/80 bg-gray-900/60'>
          {isLoading && <Spinner />}
          <ul className='flex flex-row gap-2 items-center '>
            Skills:{" "}
            {profile.skills?.map((skill, index) => (
              <li
                className=' px-2 py-1  border-2  border-primary-400 rounded-md bg-black'
                key={index}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CandidateFeed;
