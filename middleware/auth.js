const jws = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
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
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJpZCI6IjY1YTE4ZjRjMDU3NDkyZjA1ZTU5MWMyZSIsImlhdCI6MTcwNTA4Njc5Nn0
//   .m0cW4dMcLFWa2JvNIq53Gf4zwe81CsaUaFdOJ7V_cxM;
