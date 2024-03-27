// step-1 => importing express and Router

const express = require("express");
const router = express.Router();

// step-2 =>  importing function from the controller

const {
  createUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  deleteOneUser,
} = require("../controller/user-controller.js");

// step-3 => define the function the you import from the controller on the route

router.post("/", createUser);
router.get("/:limit/:skip", getAllUsers);
router.get("/:id", getOneUser);
router.put("/:id", updateOneUser);
router.delete("/:id", deleteOneUser);
router.post("/login", login);
router.post("/login", signin);

module.exports = router;
