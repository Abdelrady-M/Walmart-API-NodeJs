const express = require("express");
const router = express.Router();
const { signUp, signIn, logOut } = require("../controller/authController");

router.post("/signup", signUp);
router.post("/signup/:id", signUp);
router.post("/signin", signIn);
router.get("/logout", logOut);
module.exports = router;
