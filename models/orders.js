const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
    paymentStatus: {
      type: String,
      default: "processed",
      enum: ["processed", "in progress", "completed"],
    },
    status: {
      type: String,
      enum: ["shipped", "Waiting for Supplier"],
    },
    amount: {
      type: Number,
    },
    items: {
      type: [Object],
    },
    shippingAddress: {
      type: Object,
    },
    billingAddress: {
      type: Object,
    },
  },
  { timestamps: true }
);

var ordersModel = mongoose.model("orders", ordersSchema);

module.exports = ordersModel;
