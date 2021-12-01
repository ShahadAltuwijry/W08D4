const postModel = require("./../../db/module/post");
// const userModel = require("./../../db/module/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRETKEY;

//posting a new post
const post = (req, res) => {
  const { id } = req.params;
  const { img, desc } = req.body;

  const newPost = new postModel({
    img,
    desc,

    // userId: req.addedToken.id,
    userId: id,
    timeStamp: Date(),
  });
  console.log(req.addedToken);
  newPost
    .save()
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//updating a post.
const updatePost = (req, res) => {
  const { id } = req.params; //post id
  const { desc } = req.body;

  // console.log(req);

  postModel.findById({ _id: id }).then((item) => {
    if (req.addedToken.id == item.userId) {
      postModel
        .findOneAndUpdate(
          { _id: id },
          { $set: { desc: desc, timeStamp: Date() } },
          { new: true }
        )
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.status(400).send("forbidden attempt");
    }
  });
};

//setting a post as deleted. ps: toggle
const softDelPost = (req, res) => {
  const { id } = req.params; //post id

  postModel.findById({ _id: id }).then((result) => {
    if (req.addedToken.id == result.userId) {
      if (result.isDel != true) {
        postModel
          .findByIdAndUpdate(
            { _id: id },
            { $set: { isDel: true } },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
            console.log(result);
          })
          .catch((err) => {
            res.send(err);
          });
      } else {
        postModel
          .findByIdAndUpdate(
            { _id: id },
            { $set: { isDel: false } },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
            console.log(result);
          })
          .catch((err) => {
            res.send(err);
          });
      }
    } else {
      res.status(400).send("forbidden attempt");
    }
  });
};

//getting existing posts all users can do this
const getPosts = (req, res) => {
  const { id } = req.params; //user id

  postModel
    .find({
      userId: id,
      //  userId: req.addedToken.id,
      isDel: false,
    })
    .then((result) => {
      res.status(200).json(result);
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//get one post | works only if not deleted & for all users
const onePost = (req, res) => {
  const { id } = req.params; //post id

  postModel
    .find({
      _id: id,
      //  userId: req.addedToken.id,
    })
    .then((result) => {
      if (result.isDel == false) {
        res.status(200).json(result);
        console.log(result);
      } else {
        res.status(404).json("post is deleted");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  post,
  updatePost,
  softDelPost,
  getPosts,
  onePost,
};
