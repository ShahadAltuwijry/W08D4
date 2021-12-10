const likeModel = require("./../../db/module/like");

const newLike = (req, res) => {
  console.log(req, "like");
  const { id, userId } = req.params;
  try {
    likeModel
      .findOneAndDelete({
        $and: [{ postId: id }, { userId: userId }],
      })
      .then((result) => {
        if (result) {
          res.status(200).send("unliked successfuly");
        } else {
          const newLike = new likeModel({
            postId: id,
            userId: userId,
          });

          newLike
            .save()
            .then((result) => {
              res.status(201).send(result);
            })
            .catch((err) => {
              res.status(404).send(err);
            });
        }
      });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { newLike };
