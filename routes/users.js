const jws = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const bycrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.send(_.pick(user, ["username", "email"]));
});

router.get("/", async (req, res) => {
  const users = await User.find().sort("email").select("username email -_id");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exist");

  user = new User(_.pick(req.body, ["username", "email", "password"]));

  const salt = await bycrypt.genSalt(10);
  user.password = await bycrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send(_.pick(user, ["username", "email"]));
});

module.exports = router;
