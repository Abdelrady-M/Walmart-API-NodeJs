const usersModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// create user
const createUser = async (req, res) => {
  const user = req.body;
  // here we are using try and catch to handle the server error
  try {
    // the  parameters that you send in the body that wantch with the schema the only parameter will be saved
    const newUser = await usersModel.create(user);
    res.status(201).json({ message: " user is saved ", data: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Get users
const getAllUsers = async (req, res) => {
  try {
    let limit = parseInt(req.params.limit);
    let skip = parseInt(req.params.skip);

    console.log('Received params - limit:', limit, 'skip:', skip); // Log the received parameters

    let users = await usersModel.find().limit(limit).skip(skip);
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
// Get user  =>   id
const getOneUser = async (req, res) => {
  let id = req.params.id;
  try {
    let user = await usersModel.findOne({ _id: id }, "name email");
    const response = res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: "Cant find this ID " });
  }
};

// update user => id
const updateOneUser = async (req, res) => {
  let { id } = req.params;
  let { username } = req.body;
  try {
    let user = await usersModel.updateOne({ _id: id }, { username: username });
    res.status(200).json({ message: "the user is updated ", data: user });
  } catch (err) {
    res.status(500).json({ message: " Error in update the document" });
  }
};
// Delete user => id
const deleteOneUser = async (req, res) => {
  let { id } = req.params;
  try {
    let user = await usersModel.deleteOne({ _id: id });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: " Error in deleting the user " });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  deleteOneUser,
};
