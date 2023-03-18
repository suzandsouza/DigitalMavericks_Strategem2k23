const express = require("express");
const {
  authenticateUser,
  makeAppointment,
} = require("../controllers/doctorsController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router
  .route("/authenticate")
  .post(isAuthenticatedUser, authorizeRoles("admin"), authenticateUser);
router
  .route("/makeappointment")
  .post(isAuthenticatedUser, authorizeRoles("patient"), makeAppointment);
module.exports = router;
