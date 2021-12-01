const express = require("express");
const authentication = require("./../middlewares/authentication");
const postRouter = express.Router();

const {
  post,
  updatePost,
  getPosts,
  onePost,
  softDelPost,
} = require("./../controller/post");

postRouter.post("/post/:id", post); //postting a post
postRouter.put("/updatePost/:id", authentication, updatePost); //updating post desc and timestamp
postRouter.get("/getPosts", authentication, getPosts); //getting all undeleted posts
postRouter.get("/onePost/:id", authentication, onePost); //getting all undeleted posts
postRouter.put("/softDelPost/:id", authentication, softDelPost); //soft delete

module.exports = postRouter;
