const express = require("express");
const router = express.Router(); // Define the router
const user = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("./post");
const Comment = require("./comment");
const verifyToken = require("../verifyToken");

//create
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPosts = await newPost.save();
    res.status(200).json(savedPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPost = await findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });
    res.status(200).json("Post deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//getPost details
router.get("/id", async (req, res) => {
  try {
    const post = await Post.findIdAnd(req.params.id);
    res.status(200).json(Post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//getPost
router.get("/", async (req, res) => {
  try {
    const searchFilter = {
      title: { $regex: express.query.search, $options: "i" },
    };
    const posts = await post.find(express.query.search ? searchFilter : null);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user post

router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
