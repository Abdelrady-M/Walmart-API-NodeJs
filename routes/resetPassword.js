const express = require("express");
const resetPassword = require("../controller/resetPassword");
const router = express.Router();

router.patch('/',resetPassword)

module.exports = router;
