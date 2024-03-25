const express = require("express");
const router = express.Router();
const resetCodeController = require("../controller/resetCode");

router.post("/", resetCodeController);

module.exports = router;
