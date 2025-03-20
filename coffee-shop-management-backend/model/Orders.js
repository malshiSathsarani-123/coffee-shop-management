const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    order_id: { type: String, unique: true, required: true }, 
    totalPrice: { type: Number, required: true },
    customerName: { type: String, required: true },
    customerAddress: { type: String, required: true },
    customerContact: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now } 
});

// Add a pre-save hook to ensure order_id always matches id
OrdersSchema.pre('save', function(next) {
    this.order_id = this.id;
    next();
});

module.exports = mongoose.model('Orders', OrdersSchema);