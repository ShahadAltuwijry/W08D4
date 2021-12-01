const userModel = require("./../../db/module/user");
const postModel = require("./../../db/module/post");
const commentModel = require("./../../db/module/comment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SALT = Number(process.env.SALT);
const secret = process.env.SECRETKEY;

//registration for all
const registration = async (req, res) => {
  const { userName, email, password, avatar, role } = req.body;

  const savedEmail = email.toLowerCase();
  const savedPassword = await bcrypt.hash(password, SALT);
  try {
    const newUser = new userModel({
      userName,
      email: savedEmail,
      avatar,
      password: savedPassword,
      role,
    });

    newUser
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send(err.message);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

//logging in for all
const login = (req, res) => {
  const { logMethod, password } = req.body;

  userModel
    .findOne({ $or: [{ userName: logMethod }, { email: logMethod }] })
    .then(async (result) => {
      if (result) {
        if (logMethod === result.email || logMethod === result.userName) {
          const savedPassword = await bcrypt.compare(password, result.password);
          const payload = { role: result.role, id: result._id };
          const token = jwt.sign(payload, secret);

          if (savedPassword) {
            res.status(200).json({ result, token });
          } else {
            res.status(400).json("invalid email or password");
          }
        } else {
          res.status(400).json("invalid email or password");
        }
      } else {
        res.status(404).json("email isn registred");
      }
    });
};

//getting all users for admins
const getUsers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//soft deleting a user for admins. ps: toggle
const deleteUser = (req, res) => {
  const { id } = req.params;

  userModel.findById({ _id: id }).then((result) => {
    if (result.isDel != true) {
      userModel
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
      userModel
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
  });
};

//admin deleteing any posts or comments
const deleteContent = (req, res) => {
  const { id } = req.params;

  
};

module.exports = { registration, login, getUsers, deleteUser };
