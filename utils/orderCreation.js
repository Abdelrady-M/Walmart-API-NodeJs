require("dotenv").config();
const axios = require("axios");
const createOrder = async (orderData) => {
  try {
    const orderCreationResponse = await axios.post(
      `${process.env.YOUR_API_URL}/orders/`,
      orderData
    );
    if (orderCreationResponse.status === 201) {
      console.log("Order created successfully:", orderCreationResponse.data);
    } else {
      console.error(
        "Failed to create order:",
        orderCreationResponse.statusText
      );
    }
  } catch (error) {
    console.error("Error creating order:", error.message);
    console.log("Error response data:", error.response.data);
  }
};

module.exports = { createOrder };