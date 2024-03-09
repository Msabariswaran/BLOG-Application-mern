const express = require("express");
const router = express.Router();
const user = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("./post");
const Comment = require("../models/comment");
const verifyToken = require("../verifyToken");
// const { route, post } = require("./auth");
// const router = require("./auth");

//create
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newComment = new Comment(req.body); // Create a new Comment
    const savedComment = await newComment.save(); // Save the comment to
    res.status(200).json(savedComment); // Respond with the saved comment
  } catch (err) {
    res.status(500).json({ error: "Error creating comment", details: err }); // Handle any errors
  }
});

//update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedComment = await findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete
router.delete("/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("comment deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get coment
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
