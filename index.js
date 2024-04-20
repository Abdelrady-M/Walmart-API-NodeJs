// step-1 =>  require nongoose , express , and also define the routes
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/product");
const ordersRouter = require("./routes/orders");
const reviewsRouter = require("./routes/reviews");
const cartRouter = require("./routes/cart");
const wishRouter = require("./routes/wishlist");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
// schedule Function to delete old guest carts
const deleteOldCarts = require("./helpers/schedule");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error");
// const nodemailer = require("nodemailer");
// const usersModel = require("./models/user");
const emailRecoveryRoute = require("./routes/emailRecovery");
const resetCodeRoute = require("./routes/resetCode");
const resetPasswordRoute = require("./routes/resetPassword");
const userRouter = require("./routes/usersRouter");
const stripe = require("./routes/stripe")
// Connect to DB
connectDB();

// Express App

const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
deleteOldCarts();

// Routes

app.use("/users", authRouter, userRouter);
app.use("/product", productRouter);
app.use("/orders", ordersRouter);
app.use("/reviews", reviewsRouter);
app.use("/cart", cartRouter);
app.use("/wish", wishRouter);
app.use("/categories", categoryRoute);
app.use("/subcategories", subCategoryRoute);
app.use("/emailRecovery", emailRecoveryRoute);
app.use("/resetCode", resetCodeRoute);
app.use("/resetPassword", resetPasswordRoute);
app.use("/stripe", stripe);

// handle not found not found middleware
app.use("*", function (req, res, next) {
  res.status(404).json({ message: "notfound" });
});

app.use("/", (req, res) => {
  return res.json({
    message: "Welcome to the Node.js REST API using ExpressJS and MongoDB",
  });
});


//paypal 


app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`Server started listening on ${port}`)
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
