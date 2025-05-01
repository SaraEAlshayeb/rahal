const express = require("express");
const router = express.Router();
const { getAllUsers, suspendUser,getUserByEmail } = require("../controllers/userController");

router.get("/", getAllUsers);                  // GET /api/users
router.put("/suspend", suspendUser);
router.get("/:email", getUserByEmail);
// PUT /api/users/suspend

module.exports = router;
