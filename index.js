const express = require("express");
require("dotenv").config();
const db = require("./db/index");
const roleRouter = require("./routers/route/role");
const userRouter = require("./routers/route/user");
const postRouter = require("./routers/route/post");
const commentRouter = require("./routers/route/comment");
const likeRouter = require("./routers/route/like");

const app = express();
app.use(express.json());
app.use(roleRouter);
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(likeRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
