const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes');
const coffeeProductRoutes = require('./routes/coffeeProductRoutes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const host = 'localhost';

dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong!" });
});


app.listen(PORT, host, () => {
    console.log(`Server is running on http://${host}:${PORT}`);
});

app.use('/api/customers', customerRoutes);
app.use('/api/coffeeProduct', coffeeProductRoutes);