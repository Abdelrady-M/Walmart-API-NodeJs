const mongoose = require("mongoose");

const wishProductSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "product",
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
      unique: true,
      required: true,
    },
    items: [wishProductSchema],
  },
  { timestamps: true }
);

var wishlistModel = mongoose.model("wishlist", wishlistSchema);
module.exports = wishlistModel;