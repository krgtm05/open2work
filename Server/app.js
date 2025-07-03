const express = require("express");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://krgautamofficial:xf4bC912otWoOx9w@cluster0.wzi6zvs.mongodb.net/open2work"
);

const app = express();

app.use(express.json());

app.use("/", userRoutes);

app.listen(3000, () => {
  console.log("listening at 3000");
});
