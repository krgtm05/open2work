const express = require("express");
const router = express.Router();

router.post("/", function (req, res) {
  res.send("POST request to the homepage");
});

router.post("/signup", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  res.status(200).json({
    message: "you are signed up successfully",
  });
});

router.post("/login", function (req, res) {
  res.send("you are looged in successfully");
});

module.exports = router;
