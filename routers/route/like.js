const express = require("express");
const likeRouter = express.Router();

const { like, getRoles } = require("./../controller/role");

likeRouter.post("/like", like);
likeRouter.get("/roles", getRoles);

module.exports = likeRouter;
