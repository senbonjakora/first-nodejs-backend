const winston = require("winston");

const error = function (error, req, res, next) {
  winston.error(error.message, error);
  return res.status(500).send("Something failed!");
};

module.exports = error;
