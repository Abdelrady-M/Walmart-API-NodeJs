const express = require("express");
const ordersModel = require("../models/orders");

// ==============< getOneOrderById >==============

const getComingOrderOfOneUser = async (req, res) => {
  var userId = req.params.id;
  try {
    const allOrders = await ordersModel.find({
      userId: userId,
      status: "Waiting for Supplier",
    });
    res.status(200).json({ allOrders });
  } catch (err) {
    res.status(400).json({ error: `error : ${err}`, why: "Be" });
  }
};
// ==============< getOneOrderById >==============

const getPastOrderOfOneUser = async (req, res) => {
  var userId = req.params.id;
  try {
    const allOrders = await ordersModel.find({
      userId: userId,
      status: "shipped",
    });
    res.status(200).json({ allOrders });
  } catch (err) {
    res.status(400).json({ error: `error : ${err}`, why: "Be" });
  }
};
// ==============< getOneOrderById >==============
const getAllOrdersForAdmin = async (req, res) => {
  try {
    const allOrders = await ordersModel.find().populate("userId");
    res.status(200).json({ allOrders });
  } catch (err) {
    res.status(400).json({ error: `error : ${err}` });
  }
};

const getOneOrderById = async (req, res) => {
  let id = req.params.id;
  console.log("this is product id ", id);
  try {
    const order = await ordersModel.find({ _id: id });
    // console.log("order ==============> ", order);

    res.status(200).json({ order });
  } catch (err) {
    res.status(400).json(`error : ${err}`);
  }
};

// ==============< createOrder >==============

const createOrder = async (req, res) => {
  console.log("this is new order ");
  var order = req.body;
  console.log("this is the order => ", order);
  try {
    const newOrder = await ordersModel.create(order);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json(`error: ${err}`);
  }
};

// ==============< updatingOrders >==============

const updatingOrders = async (req, res) => {
  var id = req.params.id;
  var updates = req.body;
  console.log(updates);
  try {
    const updatedOrder = await ordersModel.updateOne({ _id: id }, updates);
    res.status(200).json({ updatedOrder });
  } catch (err) {
    res.status(400).json(`error: ${err}`);
  }
};

// ==============< deleteOrder >==============

const cancelOrder = async (req, res) => {
  var id = req.params.id;
  try {
    console.log(id);
    const order = await ordersModel.updateOne(
      { _id: id },
      { status: "canceled" }
    );
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(`error: ${err}`);
  }
};
// ==============< completedOrderProducts >==============
// GET products from all shipped orders
const completedOrderProducts = async (req, res) => {
  try {
    // const userId = req.user._id;
    // Find all orders with the "shipped" status for the specified user
    const shippedOrders = await ordersModel.find({
      userId,
      status: "shipped",
    });

    if (!shippedOrders || shippedOrders.length === 0) {
      return res.status(404).json({ message: "No shipped orders found" });
    }

    // Extract and send products from all shipped orders
    const allProducts = shippedOrders.reduce((products, order) => {
      const orderProducts = order.items.map((item) => ({
        orderId: order._id,
        title: item.title,
        productId: item._id,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        discountPercentage: item.discountPercentage,
        priceAfterDescount: item.priceAfterDescount,
        colors: item.colors,
        thumbnail: item.thumbnail,
        images: item.images,
        category: item.category,
        subcategory: item.subcategory,
        brand: item.brand,
        rating: item.rating,
      }));

      return products.concat(orderProducts);
    }, []);

    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getPastOrderOfOneUser,
  getOneOrderById,
  createOrder,
  updatingOrders,
  cancelOrder,
  getComingOrderOfOneUser,
  completedOrderProducts,
  getAllOrders: getAllOrdersForAdmin,
};
