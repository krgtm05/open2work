import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from "../Spinner";

function EmployerFeed() {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [receivedApplicationCount, setReceivedApplicationCount] = useState(0);

  useEffect(() => {
    async function fetchCandidateProfile() {
      try {
        const res = await axios.get("/api/me", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setProfile(res.data.profile);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    async function fetchApplications() {
      try {
        const response = await axios.get("/api/application-received", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        console.log(response.data);
        setReceivedApplicationCount(response.data.applicationsReceived.length);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching applications: from frontend", error);
      }
    }

    fetchApplications();
    fetchCandidateProfile();
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
            <b>Organization</b>: {profile.companyName}
          </p>
          <p>
            <b>Location</b>: {profile.location}
          </p>
          <p>
            <b>About</b>: {profile.about}
          </p>
          <p>
            <b>Website</b>: {profile.websiteUrl}
          </p>
        </div>
        <div className='h-[30vh] col-span-1 flex flex-col justify-between items-center  rounded-lg border-2 border-primary-400  '>
          <div className='h-[90%] flex flex-col items-center justify-center '>
            {isLoading && <Spinner />}
            <h1 className='text-9xl font-bold'>{receivedApplicationCount}</h1>
          </div>
          <p className='bg-green-400 w-full text-center p-2 rounded-b text-gray-900 '>
            {" "}
            <b>Applicants</b>
          </p>
        </div>
        <div className='col-span-3 text-center  p-4 border-2 rounded-lg border-gray-900/80 bg-gray-900/60'>
          Notifications: Latest notifications will appear here!
        </div>
      </div>
    </div>
  );
}

export default EmployerFeed;
