const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const farmerRoutes = require('./routes/farmers');
const farmInfoRoutes = require('./routes/farminfo');
require("dotenv").config();

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/farminfo', farmInfoRoutes);

// Mongoose connection using .then()
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Connection error", err);
  });
