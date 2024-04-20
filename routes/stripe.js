const express = require("express");
const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_API_KEY);
const router = express.Router();
const { createOrder } = require("../utils/orderCreation");
const { getAddresssBook } = require("../utils/getAddressBook");
const { deteCartProducts } = require("../utils/deleteCartProducts");
const axios = require("axios");

// ============================================================================

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    description: req.body.order.shippingAddress._id,
    metadata: {
      userId: req.body.userId,
      cartItems: JSON.stringify(
        req.body.order.items.map((item) => {
          console.log("this is the item ====> ", item);
          return { productId: item._id, quantity: item.quantity };
        })
      ),
    },
  });

  const line_items = req.body.order.items.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.thumbnail],
          metadata: {
            productId: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkoutSuccess`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
});

//==========================< Webhook >==========================

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
//  the comming is the  that u have it when you cofigure the cli of the strip
//  but when you are going to publish your app online you have to create new one

// endpointSecret =
//   "whsec_fb5c9f950d87211fae2f27eb76fa20265c179e72ecffdff27b9a53230de50bab";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    // =========================
    // to verify webhook comes from stripe
    let data, eventType;
    //  i am useing if statemnt bcz the verification cause an error
    const sig = req.headers["stripe-signature"];

    try {
      if (endpointSecret) {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        data = event.data.object;
        eventType = event.type;
      } else {
        data = req.body.data.object;
        eventType = req.body.type;
      }
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // //==========================< Handle event type >==========================
    if (eventType === "checkout.session.completed") {
      try {
        const customer = await stripe.customers.retrieve(data.customer);
        const items = JSON.parse(customer.metadata.cartItems);
        console.log(
          "this is the customer ",
          customer,
          "this is the data ",
          data,
          "the following is the cart itemsssssssssssssss : ==================>>>>>>>>>>>>>>>>",
          items
        );
        // ===============  get AddresssBook using userId >================

        const addressBook = await getAddresssBook(
          customer.metadata.userId,
          customer.description
        );
        // ===============  get product data  >================
        const orderProducts = [];
        const getOrderProduct = async () => {
          for (let i = 0; i < items.length; i++) {
            try {
              const res = await axios.get(
                `${process.env.YOUR_API_URL}/product/${items[i].productId}`
                
              );
              console.log("ressssssssssssssssssssssssssss",res)
              if (res.status === 200) {
                console.log("Order created successfully:");
                res.data.data.quantity = items[i].quantity;
                orderProducts.push(res.data.data);
              } else {
                console.error(
                  "Failed to create product order:",
                  res.statusText
                );
              }
            } catch (error) {
              console.error("Error creating productorder:", error.message);
            }
          }
        };
        await getOrderProduct();
        // ================< handle construct order >================
        const orderData = {
          userId: customer.metadata.userId,
          items: orderProducts,
          paymentStatus: data.payment_status,
          status: "Waiting for Supplier",
          amount: Number(data.amount_total) / 100,
          shippingAddress: { ...addressBook },
        };
        console.log("order products => ", orderData);
        // ================< handle adding order >================
        await createOrder(orderData);
        // ================< handle delete Cart prod >================
        await deteCartProducts(customer.metadata.userId);
      } catch (err) {
        console.error("error message ", err.message);
      }
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  }
);

module.exports = router;