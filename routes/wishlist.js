const express = require("express");
const {
  getAllWishlistProducts,
  addUserWishlist,
  addOneProductToWishlist,
  deleteOneProductFromWishlist,
  deleteUserWishlist
} = require("../controller/wishlist");

const router = express.Router();
router.get("/", getAllWishlistProducts);
router.post("/", addUserWishlist);
router.patch("/", addOneProductToWishlist);
router.delete("/", deleteOneProductFromWishlist);
router.delete("/:userId", deleteUserWishlist);

module.exports = router;
