const mongoose = require("mongoose");
const config = require("config");

const db = function () {
  mongoose.connect(config.get("db")).then(console.log("Connected...."));
};
module.exports = db;
