const express = require("express");
const {
  createNewAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress,
} = require("../controller/address");

const router = express.Router();

router.post("/", createNewAddress);

router.get("/:userId", getAllAddresses);

router.put("/:addressId", updateAddress);

router.delete("/:addressId", deleteAddress);

module.exports = router;
