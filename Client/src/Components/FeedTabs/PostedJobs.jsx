import { useState, useEffect } from "react";
import axios from "../../axios.js";
import JobCard from "../../Components/JobCard";
import Spinner from "../../Components/Spinner";

function PostedJobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchJobs() {
    const res = await axios.get("/api/my-listed-jobs", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    setIsLoading(false);
    setJobs(res.data.jobs);
    console.log(res.data.jobs);
  }
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <>
      {isLoading && <Spinner />}
      {jobs.length != 0 ? (
        <div className='grid grid-cols-2 gap-4'>
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} tab={"emp"} onDelete={fetchJobs} />
          ))}
        </div>
      ) : (
        "You have not posted any job yet"
      )}
    </>
  );
}

export default PostedJobs;
