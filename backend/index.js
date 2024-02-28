const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const multer = require("multer");

app.use(cors());
const corsOptions = {
  orgin: "*",
  credential: true,
};

app.use(cors(corsOptions));
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connection establish");
  } catch (err) {
    console.log(err);
  }
};
app.use(express.json);
app.listen(process.env.PORT, () => {
  connectDB();
  console.log("app listerning on port " + process.env.PORT);
});
