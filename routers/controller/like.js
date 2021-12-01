const likeModel = require("./../../db/module/like");

const newLike = (req, res) => {
  const { id } = req.params;
  try {
    const newLike = new likeModel({
      postId: id,
      userId: req.addedToken.id,
    });

    newLike
      .save()
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { newLike };
