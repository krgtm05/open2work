const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
  email: String,
  password: String,
  role: String,
});

const Employer = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  companyName: String,
  websiteUrl: String,
  teamSize: Number,
  industry: String,
  location: String,
  about: String,
});

const Candidate = new Schema({
  userId: ObjectId,
  fullName: String,
  experience: String,
  skills: [String],
  location: String,
  about: String,
});

const Job = new Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
  },
  title: String,
  experience: String,
  salary: String,
  description: String,
});

const UserModel = mongoose.model("User", User);
const JobModel = mongoose.model("Job", Job);
const EmployerProfileModel = mongoose.model("Employer", Employer);
const CandidateProfileModel = mongoose.model("Candidate", Candidate);

module.exports = {
  UserModel: UserModel,
  JobModel: JobModel,
  ObjectId: ObjectId,
  EmployerProfileModel: EmployerProfileModel,
  CandidateProfileModel: CandidateProfileModel,
};
