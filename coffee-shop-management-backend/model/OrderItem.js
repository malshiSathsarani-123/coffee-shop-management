const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    id: { type: String, ref: 'Orders', required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);
