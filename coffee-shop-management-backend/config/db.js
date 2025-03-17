const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  console.log('Attempting to connect to MongoDB...');
  try {
      await mongoose.connect(uri);
      console.log('Connected to MongoDB');
  } catch (error) {
      console.error('MongoDB connection error:', error.message);
  }
};

module.exports = connectDB;
