const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
  fullName: String,
  email: String,
  password: String,
  role: String,
});

const ApplicationSchema = new Schema({
  jobId: {
    type: ObjectId,
    ref: "Job",
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  resumeLink: {
    type: String,
  },
  message: {
    type: String,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
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
  userId: { type: ObjectId, ref: "User" },
  organizationName: String,
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
const ApplicationSchemaModel = mongoose.model("Application", ApplicationSchema);

module.exports = {
  UserModel: UserModel,
  JobModel: JobModel,
  ObjectId: ObjectId,
  EmployerProfileModel: EmployerProfileModel,
  CandidateProfileModel: CandidateProfileModel,
  ApplicationSchemaModel: ApplicationSchemaModel,
};
