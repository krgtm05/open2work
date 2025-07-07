import React from "react";

function JobCard({ job }) {
  return (
    <div className='flex items-center justify-center'>
      <div class='min-w-full p-6 bg-gray-900/60 border-2 border-gray-900 rounded-lg shadow-sm hover:border-primary-300/30'>
        <a href='#'>
          <h5 class='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {job.title}
          </h5>
        </a>
        <p class='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          Salary: {job.salary}
        </p>
        <p class='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          Description: {job.description}
        </p>
        <p class='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          Experience: {job.experience}
        </p>

        <p class='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          Company: {job.employerId?.companyName}
        </p>

        <a
          href='#'
          class='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-600 rounded-lg hover:bg-primary-700 '
        >
          Apply Now
          <svg
            class='rtl:rotate-180 w-3.5 h-3.5 ms-2'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 10'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M1 5h12m0 0L9 1m4 4L9 9'
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default JobCard;
