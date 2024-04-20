// step-1 => importing express and Router

const express = require("express");
const router = express.Router();

// step-2 =>  importing function from the controller

const {
  createUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  updateOneUserAddress,
  deleteOneUser,
} = require("../controller/user.js");
const { tokenValidate } = require("../middlewares/isTokenValid");
// step-3 => define the function the you import from the controller on the route

router.post("/", createUser);
router.get("/:limit/:skip", tokenValidate, getAllUsers);
router.get("/:id", getOneUser);
router.put("/:id", updateOneUser);
router.put("/address/:id", updateOneUserAddress);

router.delete("/:id", deleteOneUser);

module.exports = router;
