const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "product",
    },
    userId: {
      type: mongoose.SchemaTypes.String,
      ref: "users",
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

var reviewsModel = mongoose.model("reviews", reviewsSchema);

module.exports = reviewsModel;
