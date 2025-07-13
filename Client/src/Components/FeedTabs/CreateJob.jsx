import { useState } from "react";
import axios from "../../axios";

function CreateJob() {
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const isFormValid = title.trim() !== "" && salary.trim() !== "";

  async function handleEmployerSubmit() {
    try {
      const res = await axios.post(
        "/api/createjob",
        {
          title: title,
          experience: experience,
          salary: salary,
          description: description,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data);
      alert("Job posted successfully");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <section className='container'>
      <div className='w-full flex flex-col items-center justify-center'>
        <div className='w-full bg-gray-900/60 md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <div>
              <label
                htmlFor='title'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Job Title
              </label>
              <input
                type='text'
                name='title'
                id='title'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Enter job title'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor='experience'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Experience Required
              </label>
              <input
                type='link'
                name='experience'
                id='experience'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Minimum experience required'
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor='salary'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Salary
              </label>
              <input
                type='text'
                name='salary'
                id='salary'
                placeholder='Salary'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor='description'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Description
              </label>
              <input
                type='text'
                name='description'
                id='description'
                placeholder='Describe about the role'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              disabled={!isFormValid}
              onClick={handleEmployerSubmit}
              type='submit'
              className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  '
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateJob;
