const express = require("express");
const { protect } = require("../controller/authController");
var router = express.Router();
var {
  getPastOrderOfOneUser,
  getComingOrderOfOneUser,
  getOneOrderById,
  createOrder,
  updatingOrders,
  cancelOrder,
  getAllOrders,
  completedOrderProducts,
} = require("../controller/orders");
const { tokenValidate } = require("../middlewares/isTokenValid");


router.get("/past/:id", getPastOrderOfOneUser);
router.get("/coming/:id", getComingOrderOfOneUser);
router.get("/", tokenValidate, getAllOrders);
router.get("/completedOrderProducts", completedOrderProducts);
router.post("/", createOrder);
router.patch("/:id", tokenValidate, updatingOrders);
router.get("/:id", getOneOrderById);
router.delete("/:id", cancelOrder);

module.exports = router;
