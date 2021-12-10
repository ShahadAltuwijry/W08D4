const mongoose = require("mongoose");

const user = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  isDel: { type: Boolean, default: false },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: "61a73499b03855b1f60c3571",
  },
});

module.exports = mongoose.model("User", user);
