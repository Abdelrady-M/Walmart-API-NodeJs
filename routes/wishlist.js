const express = require("express");
const {
  getAllWishlistProducts,
  addUserWishlist,
  addOneProductToWishlist,
  removeOneProductFromWishlist,
  deleteUserWishlist,
} = require("../controller/wishlist");

const router = express.Router();
router.get("/", getAllWishlistProducts);
router.post("/", addUserWishlist);
router.post("/:productId", addOneProductToWishlist);
router.patch("/:productId", removeOneProductFromWishlist);
router.delete("/", deleteUserWishlist);

module.exports = router;