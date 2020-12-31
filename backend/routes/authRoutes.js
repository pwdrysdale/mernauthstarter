const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  logOut,
  updateSelf,
  deleteUser,
  resetRequest,
  resetPassword,
  checkUser,
} = require("../controllers/authController.js");

const router = express.Router();

router.route("/").post(registerUser).get(checkUser);
router.route("/login").get(logOut).post(loginUser);
router.route("/reset").post(resetRequest);
router.route("/reset/:id").post(resetPassword);
router.route("/:id").put(protect, updateSelf).delete(protect, deleteUser);

module.exports = router;
