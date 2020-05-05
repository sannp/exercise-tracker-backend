const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

const exerciseRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

//----Tell server to use whatever port you have available
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//----Use the url if available
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/api/exercises", exerciseRouter);
app.use("/api/users", usersRouter);

//If application is in production
app.get("/", function (req, res) {
  res.send("API for the Tracker App");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
