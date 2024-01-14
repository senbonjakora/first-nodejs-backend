const _ = require("lodash");
const config = require("config");
const jws = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { User } = require("../models/user");
const Joi = require("joi");

router.get("/", async (req, res) => {
  //const users = await User.find().sort("email").select("username email -_id");
  res.send("Auth");
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const passwordValid = await bycrypt.compare(req.body.password, user.password);
  if (!passwordValid) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().required().min(5).max(100),
    password: Joi.string().required().min(5).max(255),
  });

  return schema.validate(req.body);
}

module.exports = router;
