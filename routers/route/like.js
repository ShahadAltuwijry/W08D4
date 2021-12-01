const express = require("express");
const likeRouter = express.Router();
const authentication = require("./../middlewares/authentication");

const { newLike } = require("./../controller/like");

likeRouter.post("/like/:id", authentication, newLike);
// likeRouter.get("/roles", getRoles);

module.exports = likeRouter;
