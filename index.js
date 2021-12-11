const express = require("express");
require("dotenv").config();
const db = require("./db/index");
const cors = require("cors");
const roleRouter = require("./routers/route/role");
const userRouter = require("./routers/route/user");
const postRouter = require("./routers/route/post");
const commentRouter = require("./routers/route/comment");
const likeRouter = require("./routers/route/like");
const passport = require("passport");
const session = require("express-session");
const authRoutes = require("./routers/route/auth");
require("./routers/middlewares/passport");

// const GoogleStrat = require("passport-google-oauth20");
// const { request } = require("express");

const app = express();
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());

app.use(roleRouter);
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(likeRouter);
// app.use("/auth", authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
