const express = require("express");
const router = express.Router();
const communityController = require("../controllers/communityController");

router.get("/", communityController.getCommunityData);
router.post("/joinCommunity", communityController.joinCommunity);
router.post("/", communityController.addCommunity);
router.delete("/:name", communityController.deleteCommunity);


module.exports = router;



