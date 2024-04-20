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
  let limit = parseInt(req.params.limit);
  let skip = parseInt(req.params.skip);

  try {
    let users = await usersModel.find({role: "user"}).limit(limit).skip(skip);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "something Went rong " });
  } 
};
// Get user  =>   id
// const getOneUser = async (req, res) => {
//   let id = req.params.id;
//   try {
//     let user = await usersModel.findOne({ _id: id }, "name email");
//     const response = res.status(200).json(user);
//   } catch (err) {
//     res.status(404).json({ message: "Cant find this ID " });
//   }
// };
const getOneUser = async (req, res) => {
  let id = req.params.id;
  try {
    let user = await usersModel.findOne({ _id: id });
    const response = res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: "Cant find this ID " });
  }
};
// update user => id
const updateOneUser = async (req, res,auth) => {
  let { id } = req.params;
  // let { username } = req.body;
  var updates = req.body;
  console.log(updates);
  try {
    let todos = await usersModel.updateOne({ _id: id }, updates);
    const response = res.status(200).json({ message: "the user is updated ", data: todos });
  } catch (err) {
    const response =  res.status(500).json({ message: ` Error in update the document : ${err}` });
  }
};

const updateOneUserAddress = async (req,res,auth)=>{
  let { id } = req.params;
  var updates = req.body;
  console.log(`id : ${id}`);

  console.log(`updates : ${[...updates]}`);
  try {
    let result = await usersModel.updateOne({ _id: id }, {addressBook : updates});
    res.status(200).json({ message: "the user is updated ", result});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: ` Error in update the document : ${err}` });
  }
}

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
  updateOneUserAddress,
  deleteOneUser,
};
