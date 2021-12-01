const mongoose = require("mongoose");

const post = new mongoose.Schema({
  desc: { type: String, required: true },
  img: { type: String },
  timeStamp: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Post", post);
