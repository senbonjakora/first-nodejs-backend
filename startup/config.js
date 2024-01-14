const config = require("config");

module.exports = function () {
  if (!config.get("jsonTokenPrivateKey")) {
    throw new Error("FATAL ERROR: jsonTokenPrivateKey not Set");
  }
};
