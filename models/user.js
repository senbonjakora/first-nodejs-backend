const mongoose = require("mongoose");
const Joi = require("joi");
const jws = require("jsonwebtoken");
const config = require("config");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minlength: 4,
    maxlength: 255,
  },
  email: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 100,
  },
  password: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 255,
  },
  isAdmin: Boolean,
});

UserSchema.methods.generateAuthToken = function () {
  return jws.sign(
    { _id: this._id, admin: this.isAdmin },
    config.get("jsonTokenPrivateKey")
  );
};
const User = mongoose.model("User", UserSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().required().min(4).max(255),
    email: Joi.string().email().required().min(5).max(100),
    password: Joi.string().required().min(5).max(255),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
