import { useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import JobCard from "../JobCard";
import { useEffect } from "react";

function AllJobs() {
  const [alljobs, setAlljobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchJobs() {
      try {
        const res = await axios.get("/api/alljobs", {
          headers: {
            token: token,
          },
        });
        setIsLoading(false);
        setAlljobs(res.data.alljobs);
      } catch (e) {
        console.log("Failed to fetch jobs:", e);
      }
    }
    fetchJobs();
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      <div className='grid grid-cols-2 gap-4'>
        {alljobs.map((job) => (
          <JobCard key={job._id} job={job} tab={"Jobs"} />
        ))}
      </div>
    </>
  );
}

export default AllJobs;
