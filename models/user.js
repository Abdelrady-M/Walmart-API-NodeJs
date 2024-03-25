const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");
const user = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name "],
      minLength: 3,
      maxLength: 15,
    },
    email: {
      type: String,
      required: [true, "please enter your email "],
      unique: true,
      minLength: 8,
      validate: [validator.isEmail, "please enter valid email"],
    },
    password: {
      type: String,
      required: [true, "please enter your Password"],
      minLength: 8,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    passwordResetCode: Number,
    passwordResetCodeExpires: Date,
  },
  { timestamps: true }
);
// hashing pass before insert it inside data
user.pre("save", async function (next) {
  var salt = await bcrypt.genSalt(10);
  // is modified will check if the field is modified and if the password has not been modified it will return the another function
  if (!this.isModified("password")) return next();
  let hashedPass = await bcrypt.hash(this.password, salt);
  this.password = hashedPass;
  this.confirmPassword = undefined;
  next();
});
module.exports = mongoose.model("users", user);

