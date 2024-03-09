const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookiesParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
const commentRoute = require("./routes/comment");

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
//middleware

app.use(express.json);

app.use("/images", express.static(path.join(__dirname, "/images")));
console.log(cors());

app.use(cookiesParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

//upload image storage
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "image");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  },
});
const upload = multer({ storage: storage });
app.post("api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image upload successfully");
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("app listerning on port " + process.env.PORT);
});
