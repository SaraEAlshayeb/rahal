const express = require("express");
const router = express.Router();
const { getAllUsers, suspendUser, registerUser} = require("../controllers/userController");

router.get("/", getAllUsers);                  // GET /api/users
router.put("/suspend", suspendUser);           // PUT /api/users/suspend
router.post("/register", registerUser);

module.exports = router;
