const express = require("express");
const authentication = require("./../middlewares/authentication");
const postRouter = express.Router();

const {
  post,
  updatePost,
  getPosts,
  onePost,
  softDelPost,
  deletePostComment,
} = require("./../controller/post");

postRouter.post("/post/:id", post); //postting a post
postRouter.put("/updatePost/:id", authentication, updatePost); //updating post desc and timestamp
postRouter.get("/getPosts", authentication, getPosts); //getting all undeleted posts
postRouter.get("/onePost/:id", authentication, onePost); //getting all undeleted posts
postRouter.put("/softDelPost/:id", authentication, softDelPost); //soft delete
postRouter.put("/userdelcom/:postId/:commentId", authentication, deletePostComment); //user can delete any comment on his post

module.exports = postRouter;
