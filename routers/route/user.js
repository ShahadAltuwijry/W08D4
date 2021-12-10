const express = require("express");
const userRouter = express.Router();
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");
const {
  registration,
  login,
  getUsers,
  deleteUser,
} = require("./../controller/user");

userRouter.post("/regster", registration);
userRouter.post("/login", login);
userRouter.get("/users", getUsers);
userRouter.put("/delUser/:id", authentication, authorization, deleteUser);

module.exports = userRouter;
