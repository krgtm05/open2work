const express = require("express");
const router = express.Router();
const { UserModel, JobModel, ObjectId } = require("../DB/db");
const { auth, JWT_SECRET, jwt } = require("../authMiddleware");
const { onlyEmployer } = require("../onlyEmployer");

router.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const role = req.body.role;

  await UserModel.create({
    email: email,
    password: password,
    name: name,
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
  const employerId = userId;
  const title = req.body.title;
  const experience = req.body.experience;
  const salary = req.body.salary;
  const description = req.body.description;

    await JobModel.create({
      employerId: userId,
      title: title,
      experience: experience,
      salary: salary,
      description: description,
    });

    return res.status(200).json({
      message: "Job posted successfully",
    });
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

module.exports = router;
