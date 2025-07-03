const express = require("express");
const router = express.Router();
const { UserModel } = require("../DB/db");
const { authMiddware, JWT_SECRET, jwt } = require("../authMiddleware");

router.post("/signup",async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
    email:email,
    password:password,
    name:name
  })
  
  res.status(200).json({
    message: "you are signed up successfully",
  });

});

router.post("/login",async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({ email: email, password: password })
  
  if(user){
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    return res.status(200).json({
      message: "you are logged in successfully",
      token: token,
    });
  }
  else{
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

});

module.exports = router;
