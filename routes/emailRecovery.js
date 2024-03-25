const express = require("express");
const router = express.Router();
const emailRecoveryController = require("../controller/emailRecoveryController");

router.post("/", emailRecoveryController);

module.exports = router;
