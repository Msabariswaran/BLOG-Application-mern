const express = require("express");
const router = express.Router;
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const Comment = require("../models/Comment");
const verifyToken = require("../routes/verifyToken");

