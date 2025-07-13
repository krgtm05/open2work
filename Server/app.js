const express = require("express");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(
  cors({
    origin: "https://open2work-tau.vercel.app/", // replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // if you need to send cookies or auth headers
  })
);

app.use(express.json());

app.use("/api", userRoutes);

app.listen(process.env.PORT || 5000);
