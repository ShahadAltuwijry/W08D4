const express = require("express");
const userRouter = express.Router();
const popuptools = require("popup-tools");
require("./../middlewares/passport");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");
const {
  registration,
  login,
  confirmed,
  getUsers,
  deleteUser,
} = require("./../controller/user");
const passport = require("passport");

userRouter.post("/regster", registration);
userRouter.post("/login", login);
userRouter.put("/confirm/:id", confirmed);
userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.end(popuptools.popupResponse(req.user));
  }
);
userRouter.get("/users", getUsers);
userRouter.put("/delUser/:id", authentication, authorization, deleteUser);

module.exports = userRouter;
