// const mongoose = require("mongoose");
// const categorySchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       unique: true,
//       minLength: [2, "too short category name"],
//       maxLength: [32, "too long category name"],
//     },
//     image: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// var categoryModel = mongoose.model("category", categorySchema);
// module.exports = categoryModel;


const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    _id: {
      type: String, 
    },
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: [2, "too short category name"],
      maxLength: [32, "too long category name"],
    },
    name_ar: {
      type: String,
      required: true,
      unique: true,
      minLength: [2, "too short category name"],
      maxLength: [32, "too long category name"],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// Define a pre-save middleware to set the _id based on the name
categorySchema.pre("save", function (next) {
  this._id = this.name; // Set _id to the value of the name field
  next();
});

const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
