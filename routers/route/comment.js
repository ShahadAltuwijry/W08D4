const express = require("express");
const commentRouter = express.Router();

const {
  newComment,
  updateComment,
  getComment,
  delComment,
} = require("./../controller/comment");

commentRouter.post("/comment/:id", newComment);
commentRouter.put("/updateComment/:id", updateComment); //updating post desc and timestamp
commentRouter.get("/getComment/:id", getComment); //getting all undeleted posts
commentRouter.put("/delComment/:id", delComment); // delete comment

module.exports = commentRouter;
