const express = require("express");
const ordersModel = require("../models/orders");

const getAllOrderOfOneUser = async (req, res) => {
  try {
    const allOrders = await ordersModel.find();
    res.status(200).json({ allOrders });
  } catch (err) {
    res.status(400).json({error:`error : ${err}`, why:"Be"});
  }
};

const getOneOrderById = async (req, res) => {
  var id = req.params.id;
  try {
    const order = await ordersModel.find({ _id: id });
    res.status(200).json({ order });
  } catch (err) {
    res.status(400).json(`error : ${err}`);
  }
};

const createOrder = async (req, res) => {
  var order = req.body;
  try {
    const newOrder = await ordersModel.create(order);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json(`error: ${err}`);
  }
};

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

const deleteOrder = async (req, res) => {
  var id = req.params.id;
  try {
    const order = await ordersModel.deleteOne({ _id: id });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(`error: ${err}`);
  }
};

module.exports = {
  getAllOrderOfOneUser,
  getOneOrderById,
  createOrder,
  updatingOrders,
  deleteOrder,
};
