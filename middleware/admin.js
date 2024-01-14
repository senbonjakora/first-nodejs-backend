const admin = function (req, res, next) {
  if (!req.user.admin) return res.status(403).send("Access denied!");
  next();
};

module.exports = admin;
