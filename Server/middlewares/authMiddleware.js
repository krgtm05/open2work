const jwt = require("jsonwebtoken");
const JWT_SECRET = "whocares";
const { UserModel } = require("../DB/db");

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
