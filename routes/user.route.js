const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/usermodel");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    let users = await UserModel.find();
    res.send(users);
  } catch (error) {}
});
userRouter.post("/signup", (req, res) => {
  const { email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.json({ msg: err.message });
      } else {
        newuser = new UserModel({
          email,
          password: hash,
          confirmpassword: hash,
        });
        await newuser.save();
        res.json({ msg: "new user has been registered", newuser });
      }
    });
  } catch (error) {
    res.json({ err: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email: email });
    if (user) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          var token = jwt.sign(
            {
              userID: user._id,
            },
            "reddy",
            {
              expiresIn: "7m",
            }
          );
          res.status(200).json({ msg: "loginsucessful", token: token });
        } else {
          res.status(200).json({ msg: "wrong credentials" });
        }
      });
    } else {
      res.send({ msg: "user was not found" });
    }
  } catch (error) {
    res.json({ err: error.message });
  }
});

module.exports = {
  userRouter,
};
