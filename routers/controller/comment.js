const commentModel = require("./../../db/module/comment");
const postModel = require("./../../db/module/post");
const likeModel = require("./../../db/module/like");

//posting a new post
const newComment = (req, res) => {
  const { id, userId } = req.params; //post id
  const { desc } = req.body;

  const newComment = new commentModel({
    desc,
    userId: userId,
    postId: id,
    timeStamp: Date(),
  });

  newComment
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
const updateComment = (req, res) => {
  const { id } = req.params; //post id
  const { desc } = req.body;

  commentModel
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
};

//setting a task as deleted.
const delComment = (req, res) => {
  const { id } = req.params; //post id

  commentModel.findByIdAndDelete({ _id: id }).then((result) => {
    if (
      result.userId == req.addedToken.id ||
      req.addedToken.role == "61a73488b03855b1f60c356f"
    ) {
      res.status(200).send("comment has been deleted");
    } else {
      res.status(400).send("unauthorized user");
    }
  });
};

//getting comment
const getComment = (req, res) => {
  const { id } = req.params; //comment id

  commentModel
    .find({
      _id: id,
      //  userId: req.addedToken.id,
    })
    .then((result) => {
      res.status(200).json(result);
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//getting the post with its comments
const getAll = (req, res) => {
  const { id } = req.params;
  try {
    let fullPost = [];
    postModel
      .findOne({ _id: id })
      .populate("userId")
      .then((result) => {
        fullPost.push(result);
        commentModel
          .find({ postId: id })
          .populate("userId", "userName")
          .then((item) => {
            fullPost.push(item);
            likeModel
              .find({ postId: id })
              .populate("userId", "userName")
              .then((item) => {
                fullPost.push(item);

                res.status(200).json(fullPost);
              });
          });
      });
    // commentModel ---------> this will only get user info and the post but we need the post and comments and the likes
    //   .find()
    //   .populate("userId","")
    //   .populate("postId")
    //   .then((result) => res.status(200).json(result));
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  newComment,
  updateComment,
  getComment,
  delComment,
  getAll,
};
