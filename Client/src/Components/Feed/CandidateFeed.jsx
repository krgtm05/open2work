import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function CandidateFeed() {
  const [alljobs, setAlljobs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchJobs() {
      try {
        const res = await axios.get("/api/alljobs", {
          headers: {
            token: token,
          },
        });
        setAlljobs(res.data.alljobs); // assuming your backend returns { alljobs: [...] }
      } catch (e) {
        console.error("Failed to fetch jobs:", e);
      }
    }

    fetchJobs();
  }, []);

  return (
    <>
      <div>
        <h3>Available jobs</h3>
        <ul>
          {Array.isArray(alljobs) &&
            alljobs.map((job, index) => (
              <div key={index} style={{ border: "1px solid black" }}>
                <h4>{job.title}</h4>
                <li>{job.experience}</li>
                <li>{job.salary}</li>
                <li>{job.description}</li>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
}

export default CandidateFeed;
