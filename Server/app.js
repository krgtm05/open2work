const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use("/", userRoutes);

app.listen(3000, () => {
  console.log("listening at 3000");
});
