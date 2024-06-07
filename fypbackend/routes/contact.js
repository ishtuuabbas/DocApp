const express = require("express");
const contactController = require('../controllers/contact');
const authCheck = require("../middleware/auth-check");
const { body } = require("express-validator");
const { checkRole } = require("../middleware/rbac-check");

const router = express.Router();

router.get(
  "/contacts",
  authCheck,
  checkRole(["superadmin","admin"]),
  contactController.getAllContacts
);
router.post(
    "/contact/create",[], contactController.saveContact
  );
router.get(
  "/contacts/:id",
  authCheck,
  checkRole(["admin", "superadmin"]),
  contactController.getContactById
);
///delete
router.delete(
  "/contact/:id",
  authCheck,
  checkRole(["superadmin"]),
  contactController.deleteContact
);
module.exports = router;
