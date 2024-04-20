require("dotenv").config();
const axios = require("axios");
const getAddresssBook = async (userId, addressBookId) => {
  const res = await axios.get(`${process.env.YOUR_API_URL}/users/${userId}`);
  return res.data.addressBook.filter((add) => add._id === addressBookId)[0];
};
module.exports = { getAddresssBook };