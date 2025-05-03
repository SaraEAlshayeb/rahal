const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  suspendUser,
  registerUser,
  getUserByEmail,
  getUserById
} = require("../controllers/userController");

// Routes
router.get("/", getAllUsers);
router.put("/suspend", suspendUser);
router.post("/register", registerUser);
router.get("/id/:id", getUserById);         
router.get("/:email", getUserByEmail);     

module.exports = router;
