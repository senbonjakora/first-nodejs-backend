const jws = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  if (!config.get("requireAuth")) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No Token Provided!");

  try {
    const decodedPayload = jws.verify(token, config.get("jsonTokenPrivateKey"));
    req.user = decodedPayload;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;
