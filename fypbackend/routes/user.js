const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user");
const { checkRole } = require("../middleware/rbac-check");
const authCheck = require("../middleware/auth-check");

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address."),
    body("password").trim().notEmpty().withMessage("Password is required."),
  ],
  userController.loginUser
);

router.post(
  "/register",
  authCheck,
  checkRole(["admin", "superadmin"]),
  [
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("email").isEmail().withMessage("Invalid email address."),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    body("role")
      .optional()
      .isIn(["user", "admin", "superadmin"])
      .withMessage(
        "Invalid role. Allowed values: 'user', 'admin', 'superadmin'."
      ),
  ],
  userController.registerUser
);

router.get(
  "/users",
  authCheck,
  checkRole(["user", "admin", "superadmin"]),
  userController.getAllUsers
);

router.get(
  "/user/:userId",
  authCheck,
  checkRole(["admin", "superadmin"]),
  userController.getUserById
);

router.delete(
  "/user/delete/:userId",
  authCheck,
  checkRole(["superadmin"]),
  userController.deleteUser
);

module.exports = router;
