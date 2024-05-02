function checkRole(allowedRoles) {
  return (req, res, next) => {
    if (req.user && allowedRoles.includes(req.user.role)) {
      return next(); // User has one of the allowed roles, proceed to the next middleware/route handler
    }
    res.status(403).json({ message: "Access denied" });
  };
}

module.exports = { checkRole };
