const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
  email: String,
  password: String,
  name: String,
  role: String,
});

const Job = new Schema({
  employerId: ObjectId,
  title: String,
  experience: String,
  salary: String,
  description: String,
});

const UserModel = mongoose.model("Users", User);
const JobModel = mongoose.model("Jobs", Job);

module.exports = {
  UserModel: UserModel,
  JobModel: JobModel,
  ObjectId: ObjectId,
};
