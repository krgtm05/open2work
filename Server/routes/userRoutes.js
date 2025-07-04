const express = require("express");
const router = express.Router();
const {
  UserModel,
  JobModel,
  EmployerProfileModel,
  CandidateProfileModel,
} = require("../DB/db");
const { auth, JWT_SECRET, jwt } = require("../middlewares/authMiddleware");
const { onlyEmployer } = require("../middlewares/onlyEmployer");
const { onlyCandidate } = require("../middlewares/onlyCandidate");

router.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  await UserModel.create({
    email: email,
    password: password,
    role: role,
  });

  res.status(200).json({
    message: "you are signed up successfully",
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
  const userId = req.user._id;
  const profile = await UserModel.findOne({ _id: userId });
  if (!profile) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({
    email: profile.email,
    role: profile.role,
  });
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
  const employerId = req.user._id;
  const jobs = await JobModel.find({ employerId: employerId });
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
module.exports = router;
