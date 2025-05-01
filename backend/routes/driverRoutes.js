const express = require("express");
const router = express.Router();
const multer = require("multer");

const { updateUser } = require("../controllers/driverController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // uploads directory — make sure it exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // unique file name
    }
});

const upload = multer({ storage: storage });
router.put("/:email", upload.fields([
    { name: "drivingLicense" },
    { name: "nationalId" },
    { name: "vehicleRegistration" }
]), updateUser);


module.exports = router;
