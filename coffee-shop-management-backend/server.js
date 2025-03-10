const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri)
    .then(() => console.log("MongoDB database connection established successfully"))
    .catch(err => console.log("MongoDB connection error: ", err));

// Routes
// const exampleRouter = require('./routes/example');
// app.use('/api/examples', exampleRouter);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});