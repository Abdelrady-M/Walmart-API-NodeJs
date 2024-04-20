const express = require("express");
const {
  getAllCartProducts,
  addOneProductToCart,
  modifyOneProductFromCart,
  removeOneProductFromCart,
  addUserCart,
  deleteUserCart
} = require("../controller/cart");

const router = express.Router();
// user and guest user
router.get("/", getAllCartProducts);
// user and guest user
router.post("/", addUserCart);
// user and guest user
router.post("/:productId", addOneProductToCart);
// user and guest user
router.patch("/", modifyOneProductFromCart);
// user and guest user
router.patch("/:productId", removeOneProductFromCart);
// user only
router.delete("/:id", deleteUserCart);

module.exports = router;
