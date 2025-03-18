const mongoose = require('mongoose');

const coffeeProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  price: { type: String, required: true },
  qty: { type: Number, default: 0 },
  image: { type: String, required: true },
  discount: { type: Number, default: 0 },
  isTopChoice: { type: Boolean, default: false },
});

module.exports = mongoose.model('CoffeeProduct', coffeeProductSchema);
