const wishlistModel = require("../models/wishlist");
const productModel = require("../models/product");
const jwt = require("jsonwebtoken");

var userIdFromHeaders = (req) => {
  var userId;
  const { token } = req.headers;
  if (token) {
    try {
      userId = jwt.decode(token).id;
    } catch (err) {
      console.log(err);
    }
  }
  return userId;
};

var getAllWishlistProducts = async (req, res) => {
  const userId = userIdFromHeaders(req);
  // console.log(1);
  if (userId) {
    try {
      var data = await wishlistModel
        .findOne({ userId })
        .populate("items._id", "title description thumbnail");
      res.status(201).json({ data });
    } catch (err) {
      res.status(401).json({
        message: err,
        a_way_to_fix: "Signup first then send the userId",
      });
    }
  } else {
    // case a guest tries to get his wishlist before signing up or adding any products
    res.status(404).json({ message: "Must sign in first" });
  }
};

var addUserWishlist = async (req, res) => {
  let userId;
  const { token2 } = req.headers;
  token2 && (userId = JSON.parse(token2).userId);
  // console.log(2);

  if (!userId) {
    res.status(404).json({ message: "Must signup first" });
  }
  try {
    var data = await wishlistModel.create({ userId, items: [] });
    res.status(201).json({ data });
  } catch (err) {
    if (err.message.includes("duplicate key")) {
      // send a message about the Duplicated key
      let message = {
        cause: `Duplicate ${Object.keys(err.keyValue)[0]}`,
      };
      res.status(403).json({ message });
    } else {
      res.status(400).json({ message: err });
    }
  }
};

const addOneProductToWishlist = async (req, res) => {
  const userId = userIdFromHeaders(req);
  const { productId } = req.params;

  if (!userId) {
    res.status(401).json({ message: "Must signup first" });
    return; // Return to prevent further execution
  }

  // Adding the product to the user's Wish List
  try {
    const selectedProduct = await productModel.findOne({ _id: productId });
    const newItem = { _id: productId };

    if (!selectedProduct) {
      // Case: User was missing with the product ID
      res.status(404).json({ message: "Couldn't find this product" });
      return; // Return to prevent further execution
    }

    // Create a wishlist if necessary
    let wishlist = await wishlistModel.findOne({ userId });
    if (!wishlist) {
      wishlist = await wishlistModel.create({ userId, items: [] });
    }

    const check = await wishlistModel.findOne({
      userId,
      "items._id": { $eq: productId },
    });

    if (check === null) {
      const updateNotification = await wishlistModel.updateOne(
        { userId },
        { $addToSet: { items: newItem } }
      );

      if (updateNotification.modifiedCount === 0) {
        // Case: User was not found
        res.status(404).json({ message: "Couldn't find user with this id" });
        return; // Return to prevent further execution
      }

      // Case: Product added successfully
      res.status(202).json({
        status: updateNotification,
        userId,
      });
    } else {
      // Case: Product already in the Wish List
      res.status(304).json({ message: "Item already in your Wish List" });
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

var removeOneProductFromWishlist = async (req, res) => {
  var userId = userIdFromHeaders(req);
  var { productId } = req.params;
  // console.log(4);

  try {
    var deleteNotification = await wishlistModel.updateOne(
      { userId },
      { $pull: { items: { _id: productId } } }
    );
    res.status(202).json({ data: deleteNotification });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

var deleteUserWishlist = async (req, res) => {
  // console.log(5);
  const userId = userIdFromHeaders(req);

  if (userId) {
    try {
      var deleteNotification = await wishlistModel.deleteOne({ userId });
      res.status(202).json({ data: deleteNotification });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
};

module.exports = {
  getAllWishlistProducts,
  addUserWishlist,
  addOneProductToWishlist,
  removeOneProductFromWishlist,
  deleteUserWishlist,
};