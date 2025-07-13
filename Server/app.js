const express = require("express");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.json());

app.use("/api", userRoutes);

app.listen(process.env.PORT || 5000)
