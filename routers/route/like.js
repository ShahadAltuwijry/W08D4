const express = require("express");
const likeRouter = express.Router();

const { like } = require("./../controller/like");

likeRouter.post("/like", like);
// likeRouter.get("/roles", getRoles);

module.exports = likeRouter;
