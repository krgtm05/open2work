const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../DB/db");

const JWT_SECRET = process.env.JWT_SECRET;

async function auth(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRET);
  const user = await UserModel.findById(decodedData.id);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  req.user = user; // Attach the full user object here
  next();
}
module.exports = {
  auth,
  JWT_SECRET,
  jwt,
};
