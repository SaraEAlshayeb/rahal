const express = require("express");
const router = express.Router();
const { getAllUsers, suspendUser,registerUser, getUserByEmail} = require("../controllers/userController");

router.get("/", getAllUsers);                  // GET /api/users
router.put("/suspend", suspendUser);           // PUT /api/users/suspend
router.get("/:email", getUserByEmail);
router.post("/register", registerUser); 
const { getUserById } = require('../controllers/userController');  router.get('/:id', getUserById); 
module.exports = router;
