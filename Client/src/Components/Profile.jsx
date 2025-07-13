import { useState } from "react";
import axios from "../axios.js";
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [industry, setIndustry] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([""]);
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const isFormValid = companyName.trim() !== "" && websiteUrl.trim() !== "";
  const isCandidateFormValid = organizationName.trim() !== "";
  const role = localStorage.getItem("role");

  async function handleEmployerSubmit() {
    if (!isFormValid) {
      alert("Please fill all the fields");
      return;
    }
    try {
      await axios.post(
        "/api/profile",
        {
          companyName: companyName,
          websiteUrl: websiteUrl,
          teamSize: teamSize,
          industry: industry,
          location: location,
          about: about,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      alert("Profile updated successfully");
      navigate("/login");
    } catch (error) {
      alert("Profile update failed");
      console.error("profile update failed", error);
    }
  }
  async function handleCandidateSubmit() {
    if (!isCandidateFormValid) {
      alert("Please fill all the fields");
      return;
    }
    try {
      await axios.post(
        "/api/profile",
        {
          organizationName: organizationName,
          experience: experience,
          skills: skills,
          location: location,
          about: about,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      alert("Profile updated successfully");
      navigate("/login");
    } catch (e) {
      console.log(e);
      alert("Profile update failed");
    }
  }
  return (
    <>
      {role === "employer" ? (
        <section className='container'>
          <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <a
              href='#'
              className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
            >
              <img
                className='w-8 h-8 mr-2'
                src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
                alt='logo'
              />
              Open2Work
            </a>
            <div className='w-full bg-gray-900/60 md:mt-0 sm:max-w-md xl:p-0'>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                  Complete Profile
                </h1>
                <div>
                  <label
                    htmlFor='companyName'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Company Name
                  </label>
                  <input
                    type='text'
                    name='companyName'
                    id='companyName'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Company Name'
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor='websiteUrl'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Website Url
                  </label>
                  <input
                    type='link'
                    name='websiteUrl'
                    id='websiteUrl'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='https://company.com'
                    required
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                  />
                </div>
                <div className='flex flex-row justify-between'>
                  <div>
                    <label
                      htmlFor='teamSize'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Team Size
                    </label>
                    <input
                      type='text'
                      name='teamSize'
                      id='teamSize'
                      placeholder='Number of employees'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='industry'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Industry
                    </label>
                    <input
                      type='text'
                      name='industry'
                      id='industry'
                      placeholder='Industry'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    />
                  </div>
                </div>
                <div className='flex flex-row justify-between'>
                  <div>
                    <label
                      htmlFor='location'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Location
                    </label>
                    <input
                      type='text'
                      name='location'
                      id='location'
                      placeholder='Location'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='about'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      About
                    </label>
                    <input
                      type='text'
                      name='about'
                      id='about'
                      placeholder='About the company'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  disabled={!isFormValid}
                  onClick={handleEmployerSubmit}
                  type='submit'
                  className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  '
                >
                  Submit
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Already have an account?{" "}
                  <Link
                    to='/login'
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className='container'>
          <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <a className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
              <img
                className='w-8 h-8 mr-2'
                src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
                alt='logo'
              />
              Open2Work
            </a>
            <div className='w-full bg-gray-900/60 md:mt-0 sm:max-w-md xl:p-0'>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                  Complete Profile
                </h1>
                <div>
                  <label
                    htmlFor='organizationName'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Organization Name
                  </label>
                  <input
                    type='text'
                    name='organizationName'
                    id='organizationName'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Enter your College or company name'
                    required
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor='experience'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Experience
                  </label>
                  <input
                    type='text'
                    name='experience'
                    id='experience'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Experience'
                    required
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor='skill'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Skills
                  </label>
                  <input
                    type='text'
                    name='skills'
                    id='skills'
                    placeholder='Enter skills in comma separated form'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required
                    value={skills}
                    onChange={(e) =>
                      setSkills(
                        e.target.value.split(",").map((skill) => skill.trim())
                      )
                    }
                  />
                </div>
                <div className='flex flex-row justify-between'>
                  <div>
                    <label
                      htmlFor='location'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Location
                    </label>
                    <input
                      type='text'
                      name='location'
                      id='location'
                      placeholder='Location'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='about'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      About
                    </label>
                    <input
                      type='text'
                      name='about'
                      id='about'
                      placeholder='About the company'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  disabled={!isCandidateFormValid}
                  onClick={handleCandidateSubmit}
                  type='submit'
                  className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  '
                >
                  Submit
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Already have an account?{" "}
                  <Link
                    to='/login'
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Profile;
