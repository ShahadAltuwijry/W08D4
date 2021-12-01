const express = require("express");
const authentication = require("./../middlewares/authentication");
const commentRouter = express.Router();

const {
  newComment,
  updateComment,
  getComment,
  delComment,
} = require("./../controller/comment");

commentRouter.post("/comment/:id", authentication, newComment);
commentRouter.put("/updateComment/:id", authentication, updateComment); //updating post desc and timestamp
commentRouter.get("/getComment/:id", authentication, getComment); //getting all undeleted posts
commentRouter.put("/delComment/:id", authentication, delComment); // delete comment

module.exports = commentRouter;
