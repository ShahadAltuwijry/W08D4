const express = require("express");
const authentication = require("./../middlewares/authentication");
const postRouter = express.Router();

const {
  post,
  updatePost,
  getPosts,
  allPosts,
  onePost,
  softDelPost,
  deletePostComment,
} = require("./../controller/post");

postRouter.post("/post/:id", post); //postting a post
postRouter.put("/updatePost/:id", authentication, updatePost); //updating post desc and timestamp
postRouter.get("/getPosts/:id", getPosts); //getting all undeleted posts
postRouter.get("/allPosts", allPosts);
postRouter.get("/onePost/:id", authentication, onePost); //getting all undeleted posts
postRouter.delete("/softDelPost/:id", authentication, softDelPost); //soft delete
postRouter.put(
  "/userdelcom/:postId/:commentId",
  authentication,
  deletePostComment
); //user can delete any comment on his post

module.exports = postRouter;
