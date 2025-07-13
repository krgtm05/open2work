import axios from "../axios.js";
function JobCard({ job, tab, onDelete }) {
  async function handleApplyJob() {
    try {
      const res = await axios.post(
        "/api/apply-job",
        {
          jobId: job._id,
          resumeLink: "https://example.com/resume.pdf",
          message: "I am interested in this job.",
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data);
      alert("Application submitted successfully!");
    } catch (e) {
      console.error("Error applying for job:", e);
    }
  }

  async function handleWithdrawApplication() {
    try {
      const res = await axios.delete("/api/withdraw-application", {
        data: {
          applicationId: job._id,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      onDelete();
      console.log(res.data);
      alert("Application withdrawn successfully!");
    } catch (e) {
      console.error("Error withdrawing application  :", e);
    }
  }

  async function handleDeleteJob() {
    try {
      const res = await axios.delete("/api/deletejob", {
        data: {
          jobId: job._id,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      onDelete();
      console.log(res.data);
      alert("job deleted successfully!");
    } catch (e) {
      console.error("Error deleting application  :", e);
    }
  }

  return (
    <div className=' p-6 bg-gray-900/60 border-2 border-gray-900 rounded-lg shadow-sm hover:border-primary-300/30'>
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
        {job.title}
      </h5>

      <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
        Salary: {job.salary}
      </p>
      <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
        Description: {job.description}
      </p>
      <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
        Experience: {job.experience}
      </p>

      <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
        Company: {job.employerId?.companyName}
      </p>
      {tab === "emp" ? (
        <button
          onClick={handleDeleteJob}
          className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white 
              bg-red-600 rounded-lg hover:bg-red-700'
        >
          Delete Job
          <svg
            className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 10'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 5h12m0 0L9 1m4 4L9 9'
            />
          </svg>
        </button>
      ) : (
        <button
          onClick={tab === "Jobs" ? handleApplyJob : handleWithdrawApplication}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white ${
            tab === "Jobs"
              ? "bg-primary-600 rounded-lg hover:bg-primary-700"
              : "bg-red-600 rounded-lg hover:bg-red-700"
          } `}
        >
          {tab === "Jobs" ? "Apply Now" : "Withdraw Application"}
          <svg
            className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 10'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 5h12m0 0L9 1m4 4L9 9'
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default JobCard;
