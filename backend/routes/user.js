const express = require("express");
const router = express.Router();
const { getAllUsers, suspendUser } = require("../controllers/userController");

router.get("/", getAllUsers);                  // GET /api/users
router.put("/suspend", suspendUser);           // PUT /api/users/suspend

module.exports = router;
