const express = require("express");
const router = express.Router();
const {
  UserModel,
  JobModel,
  EmployerProfileModel,
  CandidateProfileModel,
  ApplicationSchemaModel,
} = require("../DB/db");
const { auth, JWT_SECRET, jwt } = require("../middlewares/authMiddleware");
const { onlyEmployer } = require("../middlewares/onlyEmployer");
const { onlyCandidate } = require("../middlewares/onlyCandidate");

router.post("/signup", async function (req, res) {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  const user = await UserModel.create({
    fullName: fullName,
    email: email,
    password: password,
    role: role,
  });
  const token = jwt.sign({ id: user._id }, JWT_SECRET);

  res.status(200).json({
    message: "you are signed up successfully",
    token: token,
  });
});

router.post("/login", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({ email: email, password: password });

  if (user) {
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    return res.status(200).json({
      message: "you are logged in successfully",
      token: token,
    });
  } else {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
});

router.get("/me", auth, async function (req, res) {
  try {
    const user = req.user;

    if (user.role === "candidate") {
      const profile = await CandidateProfileModel.findOne({
        userId: user._id,
      }).populate({
        path: "userId",
        select: "email fullName role",
      });

      return res.json({
        message: "Candidate profile fetched successfully",
        profile,
      });
    }

    if (user.role === "employer") {
      const profile = await EmployerProfileModel.findOne({
        userId: user._id,
      }).populate({
        path: "userId",
        select: "email fullName role",
      });

      return res.json({
        message: "Employer profile fetched successfully",
        profile,
      });
    }
  } catch (error) {
    console.error("Error in /me:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/createjob", auth, onlyEmployer, async function (req, res) {
  const userId = req.user._id;
  const title = req.body.title;
  const experience = req.body.experience;
  const salary = req.body.salary;
  const description = req.body.description;

  const employerProfile = await EmployerProfileModel.findOne({ userId });
  if (!employerProfile) {
    return res.status(404).json({ message: "Employer profile not found" });
  }

  await JobModel.create({
    employerId: employerProfile._id,
    title: title,
    experience: experience,
    salary: salary,
    description: description,
  });

  return res.status(200).json({
    message: "Job posted successfully",
  });
});

router.get("/my-listed-jobs", auth, onlyEmployer, async function (req, res) {
  const emp = await EmployerProfileModel.findOne({ userId: req.user._id });
  const employerId = emp._id;
  const jobs = await JobModel.find({ employerId }).populate({
    path: "employerId",
    select: "companyName",
  });
  if (jobs) {
    return res.status(200).json({
      jobs: jobs,
      message: "All jobs listed by me",
    });
  } else {
    return res.status(200).json({
      message: "There is no job listed by me",
    });
  }
});

router.delete("/deletejob", auth, onlyEmployer, async function (req, res) {
  const jobId = req.body.jobId;

  const deletedJob = await JobModel.deleteOne({ _id: jobId });
  if (deletedJob.deletedCount === 0) {
    return res.status(200).json({
      message: "cannot find job with this id",
    });
  } else {
    return res.status(200).json({
      message: "job deleted successfully",
    });
  }
});

router.post("/profile", auth, async function (req, res) {
  const userId = req.user._id;
  const role = req.user.role;
  const profileData = req.body;

  try {
    if (role === "candidate") {
      // Check if profile exists
      const existing = await CandidateProfileModel.findOne({ userId });
      if (existing)
        return res.status(400).json({ message: "Candidate profile exists" });

      const profile = await CandidateProfileModel.create({
        userId,
        ...profileData,
      });
      return res
        .status(201)
        .json({ message: "Candidate profile created", profile });
    }

    if (role === "employer") {
      const existing = await EmployerProfileModel.findOne({ userId });
      if (existing)
        return res.status(400).json({ message: "Employer profile exists" });

      const profile = await EmployerProfileModel.create({
        userId,
        ...profileData,
      });
      return res
        .status(201)
        .json({ message: "Employer profile created", profile });
    }

    return res.status(400).json({ message: "Invalid role" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/alljobs", auth, async function (req, res) {
  const alljobs = await JobModel.find().populate(
    "employerId",
    "companyName websiteUrl teamSize industry location"
  );

  return res.status(200).json({ alljobs });
});

router.get("/allusers", auth, async (req, res) => {
  try {
    const allusers = await UserModel.find({}, "-password -__v"); // exclude sensitive fields
    return res.status(200).json({ allusers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.post("/apply-job", auth, onlyCandidate, async function (req, res) {
  const { jobId, resumeLink, message } = req.body;
  try {
    await ApplicationSchemaModel.create({
      jobId: jobId,
      userId: req.user._id,
      resumeLink: resumeLink,
      message: message,
    });
    return res
      .status(200)
      .json({ message: "Application submitted successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "error submitting application " });
  }
});

router.get("/my-applications", auth, onlyCandidate, async function (req, res) {
  try {
    const appliedJobs = await ApplicationSchemaModel.find(
      { userId: req.user._id },
      "jobId"
    ).populate({
      path: "jobId",
      select: "title salary experience description employerId",
      populate: {
        path: "employerId",
        select: "companyName", // include other fields if needed
      },
    });
    return res.status(200).json({ appliedJobs });
  } catch (e) {
    return res
      .status(500)
      .json({ error: "error fetching applied applications details" });
  }
});

router.delete(
  "/withdraw-application",
  auth,
  onlyCandidate,
  async function (req, res) {
    try {
      const applicationId = req.body.applicationId;
      const deletedApplication = await ApplicationSchemaModel.deleteOne({
        jobId: applicationId,
      });
      if (deletedApplication.deletedCount === 0) {
        return res.status(200).json({
          message: "cannot find application with this id",
        });
      } else {
        return res.status(200).json({
          message: "application deleted successfully",
        });
      }
    } catch (e) {
      return res.status(500).json({ error: "Error deleting the application" });
    }
  }
);

router.get(
  "/application-received",
  auth,
  onlyEmployer,
  async function (req, res) {
    try {
      const employer = await EmployerProfileModel.findOne({
        userId: req.user._id,
      });
      const JobsByMe = await JobModel.find({ employerId: employer._id });
      const jobsByMeIds = JobsByMe.map((job) => job._id);

      const applicationsReceived = await ApplicationSchemaModel.find({
        jobId: { $in: jobsByMeIds },
      })
        .populate("jobId", "title salary")
        .populate("userId", "fullName email");
      
      return res.status(200).json({
        message: "applications received provided",
        applicationsReceived: applicationsReceived,
      });
    } catch (e) {
      console.log("Can not fetch application received from backend", e);
    }
  }
);

module.exports = router;
