const express = require('express');
const { createOrderSchema } = require('./paypalSchema');
const { createOrder, handleSuccess, handleCancel } = require('./paypalController');

const router = express.Router();

// Route to create a PayPal order
router.post('/create-order', createOrderSchema(), createOrder);

// Route to handle PayPal success callback
router.get('/success', handleSuccess);

// Route to handle PayPal cancel callback
router.get('/cancel', handleCancel);

module.exports = router;
