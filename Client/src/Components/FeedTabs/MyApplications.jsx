import axios from "axios";
import { useState } from "react";
import JobCard from "../../Components/JobCard";
import Spinner from "../../Components/Spinner";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchMyApplications() {
    try {
      const res = await axios.get("/api/my-applications", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setIsLoading(false);
      setApplications(res.data.appliedJobs);
    } catch (e) {
      console.log(e);
    }
  }
  fetchMyApplications();

  return (
    <>
      {isLoading && <Spinner />}
      <div className='grid grid-cols-2 gap-4'>
        {applications.length === 0
          ? "You have not applied to any job yet"
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
      </div>
    </>
  );
}

export default MyApplications;
