const express = require("express");
const router = express.Router();
const { getAllUsers, suspendUser,registerUser, getUserByEmail} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");


router.get("/", verifyToken, getAllUsers); 
router.put("/suspend", verifyToken, suspendUser); 
router.get("/:email", verifyToken, getUserByEmail);
router.post("/register", registerUser); 

module.exports = router;
