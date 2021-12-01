const express = require("express");
const postRouter = express.Router();

const {
  post,
  updatePost,
  getPosts,
  onePost,
  softDelPost,
} = require("./../controller/post");

postRouter.post("/post/:id", post); //postting a post
postRouter.put("/updatePost/:id", updatePost); //updating post desc and timestamp
postRouter.get("/getPosts", getPosts); //getting all undeleted posts
postRouter.get("/onePost/:id", onePost); //getting all undeleted posts
postRouter.put("/softDelPost/:id", softDelPost); //soft delete

module.exports = postRouter;
