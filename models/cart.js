const mongoose = require('mongoose')

const cartProductSchema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "product",
        required: true,
    },
    priceWhenAdded: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    available: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true })

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        unique: true,
        required: true
    },
    items: [cartProductSchema],
    guest: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

var cartModel = mongoose.model("cart", cartSchema)

module.exports = cartModel