const express = require("express");
var router = express.Router();

var {
  getAllReviewsOfProductById,
  createReview,
  updatingReview,
  deleteReview,
} = require("../controller/reviews");

router.get("/:id", getAllReviewsOfProductById);
router.post("/", createReview);
router.patch("/:id", updatingReview);
router.delete("/:id", deleteReview);

module.exports = router;
