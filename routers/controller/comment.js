const commentModel = require("./../../db/module/comment");
// const userModel = require("./../../db/module/user");

//posting a new post
const newComment = (req, res) => {
  const { id } = req.params; //post id
  const { desc } = req.body;

  const newComment = new commentModel({
    desc,

    //   userId: req.addedToken.id,
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

//setting a task as deleted. ps: its permenant
const delComment = (req, res) => {
  const { id } = req.params; //post id

  commentModel.findByIdAndDelete({ _id: id }).then((result) => {
    res.status(200).send("comment is deleted");
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

module.exports = {
  newComment,
  updateComment,
  getComment,
  delComment,
};
