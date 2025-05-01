const express = require("express");
const router = express.Router();
const communityController = require("../controllers/communityController");

// Route for getting community data
router.get("/getCommunityData", communityController.getCommunityData);

// Route for joining a community
router.post("/joinCommunity", communityController.joinCommunity);

module.exports = router;
