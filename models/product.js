const mongoose = require(`mongoose`);
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [3, "short product title"],
      maxLength: [80, "long product title"],
    },
    title_ar: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [3, "short product title"],
      maxLength: [80, "long product title"],
    },
    description: {
      type: String,
      required: true,
      minLength: [20, "short product description"],
    },
    description_ar: {
      type: String,
      required: true,
      minLength: [20, "short product description"],
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
      //   required: true,
    },
    images: [String],
    category: {
      type: String,
      ref: "category",
      required: true,
    },
    subcategory: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "subcategory",
      required: true,
    },
    brand: {
      type: String,
      minLength: [5, "short product brand"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    skus: [
      {
        name: {
          type: String,
        },
        features: [{}],
        price: {
          type: Number,
        },
        color: [String],
      },
    ],
  },
  { timestamps: true }
);

var productModel = mongoose.model(`product`, productSchema);
module.exports = productModel;
