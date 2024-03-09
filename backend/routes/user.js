const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("./post");
const bcrypt = require("bcrypt");
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");

//update
router.get("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Post.deletMany({ userId: req.params.id });
    await Comment.deletMany({ userId: req.params.id });
    res.status(200).json("user deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get User

router.get("/:id", async (req, res) => {
  try {
    const user = await user.findById(req.params.id); // Typo: should be User instead of user
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
