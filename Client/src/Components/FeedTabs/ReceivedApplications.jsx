import { useState, useEffect } from "react";
import axios from "../../axios.js";
import Spinner from "../../Components/Spinner";

function ReceivedApplications() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await axios.get("/api/application-received", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        console.log(response.data);
        setApplications(response.data.applicationsReceived);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching applications: from frontend", error);
      }
    }

    fetchApplications();
  }, []);

  return (
    <div className='grid grid-cols-2 gap-4'>
      {isLoading && <Spinner />}

      {applications.length === 0
        ? "You have not received any applications"
        : applications.map((job) => (
            <div
              key={job._id}
              className=' flex flex-row justify-between col-span-1 border-2 rounded-lg p-4 bg-gray-900/60 border-gray-900'
            >
              <div className='flex flex-col gap-2'>
                <p>
                  <b>Role:</b> {job.jobId.title}{" "}
                </p>
                <p>
                  <b>Offer:</b> {job.jobId.salary}{" "}
                </p>

                <p>
                  <b>Received On:</b>{" "}
                  {new Date(job.appliedAt).toLocaleDateString()}{" "}
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <p>
                  <b>Name:</b> {job.userId.fullName}
                </p>
                <p>
                  <b>Email Id:</b> {job.userId.email}
                </p>
                <p>
                  <b>Resume:</b>{" "}
                  <button className='inline-flex gap-2 items-center px-3 py-1 text-sm font-medium text-center text-white bg-blue-600 rounded-md hover:bg-primary-700'>
                    <a href={job.resumeLink} target='_blank'>
                      Download
                    </a>
                  </button>
                </p>
              </div>
            </div>
          ))}
    </div>
  );
}

export default ReceivedApplications;
