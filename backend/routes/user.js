const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  suspendUser,
  registerUser,
  getUserByEmail,
  getUserById,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
router.get("/", verifyToken, getAllUsers);
router.put("/suspend", verifyToken, suspendUser);
router.get("/:email", getUserByEmail);
router.post("/register", registerUser);

router.get("/id/:id", getUserById);

module.exports = router;
