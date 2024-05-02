const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      const error = new Error("Authentication Failed!");
      error.statusCode = 401;
      throw error;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_STRING);
    req.user = decodedToken;

    next();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 403;
    }
    err.message =
      err.statusCode === 401
        ? "Authentication Failed"
        : "Internal Server Error";
    return next(err);
  }
};
