const mongoose = require("mongoose");

const orderProductSchema = mongoose.Schema({
  _id: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "short product title"],
    maxLength: [80, "long product title"],
  },

  description: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    max: [200000, "long product price"],
  },
  discountPercentage: {
    type: Number,
  },
  priceAfterDescount: {
    type: Number,
  },
  colors: [String],
  thumbnail: {
    type: String,
  },
  images: [String],
  category: {
    type: String,
    ref: "category",
  },
  subcategory: {
    type: String,
    ref: "subcategory",
  },
  brand: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "brand",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

const ordersSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
    paymentStatus: {
      type: String,
      default: "Cash on delivery",
      enum: ["Cash on delivery", "paid", "Refunded"],
    },
    status: {
      type: String,
      default: "Waiting for Supplier",
      enum: ["shipped", "Waiting for Supplier"],
    },
    amount: {
      type: Number,
    },
    items: [orderProductSchema],
    shippingAddress: {
      type: Object,
    },
  },
  { timestamps: true }
);

var ordersModel = mongoose.model("orders", ordersSchema);

module.exports = ordersModel;