const postModel = require("./../../db/module/post");
const commentModel = require("./../../db/module/comment");

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
  // console.log(req);
  newPost
    .save()
    .then((result) => {
      res.send(result);
      // console.log(result);
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
    if (
      result.userId == req.addedToken.id ||
      req.addedToken.role == "61a73488b03855b1f60c356f"
    ) {
      if (result.isDel != true) {
        postModel
          .findByIdAndUpdate(
            { _id: id },
            { $set: { isDel: true } },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
            // console.log(result);
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
            // console.log(result);
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
    .find({ userId: id })
    .populate("userId", "userName _id avatar")
    .then((result) => {
      res.status(200).json(result);
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const allPosts = (req, res) => {
  // console.log(req);

  try {
    postModel
      .find({ isDel: false })
      .populate("userId", "userName _id avatar role")
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.send("not found");
        }
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (error) {
    res.status(400).json(error.message);
  }
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

//user can delete any comment on his post
const deletePostComment = (req, res) => {
  const { postId, commentId } = req.params;

  postModel
    .findById({ _id: postId })
    .then((postResult) => {
      if (postResult.userId == req.addedToken.id) {
        //?????????? ???????????? ???????? ?????? ???????????? ?????????????? ???????? ??????????????????
        // console.log(postResult.userId);
        // console.log(req.addedToken.id);
        // console.log("first If");
        commentModel.findById({ _id: commentId }).then((comResult) => {
          if (comResult) {
            // console.log(postResult._id);
            // console.log(comResult.postId);
            // console.log("second If");
            if (postResult._id.toString() == comResult.postId.toString()) {
              //?????????? ???????????? ???????? ?????????????? ???????? ????????????????
              console.log("you'r in!!");
              commentModel
                .findByIdAndDelete({ _id: commentId })
                .then((result) => {
                  console.log("last round");
                  res.status(200).json(result.desc, " have been deleted");
                });
            } else {
              res.status(400).send("you are not allowed to delete it :/");
            }
          } else {
            res.status(400).send("comment not found");
          }
        });
      } else {
        res.status(400).send("you are not allowed to do that :/");
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

module.exports = {
  post,
  updatePost,
  softDelPost,
  getPosts,
  allPosts,
  onePost,
  deletePostComment,
};
