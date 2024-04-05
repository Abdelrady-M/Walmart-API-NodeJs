// const paypal = require('paypal-rest-sdk');

// // Configure PayPal SDK
// paypal.configure({
//     mode: 'sandbox', // Change to 'live' for production
//     client_id: 'YOUR_PAYPAL_CLIENT_ID',
//     client_secret: 'YOUR_PAYPAL_CLIENT_SECRET',
// });

// // Function to create a PayPal order
// const createOrder = (req, res) => {
//     const { order, userId } = req.body;

//     // Create a PayPal order
//     const createOrderRequest = {
//         intent: 'CAPTURE',
//         purchase_units: [
//             {
//                 amount: {
//                     currency_code: 'USD', // Change to the appropriate currency code
//                     value: '10.00', // Change to the total order amount
//                 },

//             },
//         ],
//         application_context: {
//             brand_name: 'Your Brand Name',
//             user_action: 'PAY_NOW',
//             return_url: `http://localhost:${process.env.PORT}/paypal/success`,
//             cancel_url: `http://localhost:${process.env.PORT}/paypal/cancel`,
//         },
//     };

//     paypal.orders.create(createOrderRequest, (error, order) => {
//         if (error) {
//             console.error('Error creating PayPal order:', error.message);
//             return res.status(500).json({ error: 'Failed to create PayPal order' });
//         }

//         // Redirect the client to the PayPal approval URL
//         const approvalUrl = order.links.find(link => link.rel === 'approve').href;
//         res.json({ url: approvalUrl });
//     });
// };

// // Handle PayPal success callback
// const handleSuccess = (req, res) => {
//     // Handle successful PayPal payment confirmation here
//     res.send('Payment successful');
// };

// // Handle PayPal cancel callback
// const handleCancel = (req, res) => {
//     res.send('Payment canceled');
// };

// module.exports = { createOrder, handleSuccess, handleCancel };
