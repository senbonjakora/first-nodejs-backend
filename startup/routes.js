const movies = require("../routes/movies");
const genres = require("../routes/genres");
const home = require("../routes/home");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const express = require("express");

const routes = function (app) {
  app.use(express.json());

  app.use("/", home);
  app.use("/api/movies", movies);
  app.use("/api/genres", genres);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};

module.exports = routes;
