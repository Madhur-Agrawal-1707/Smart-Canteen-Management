const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { connectDB } = require('./config/db');
const { seedDatabase } = require('./scripts/seedData');

const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Database auto-connect & seed check middleware for serverless/local
let isSeeded = false;
app.use(async (req, res, next) => {
  try {
    await connectDB();
    if (!isSeeded) {
      await seedDatabase();
      isSeeded = true;
    }
    next();
  } catch (err) {
    console.error('Database middleware error:', err.message);
    // Proceed so health check or error handling can still report
    next();
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Smart Canteen Management System API',
    environment: process.env.VERCEL ? 'vercel-serverless' : 'standalone-node',
    timestamp: new Date().toISOString(),
  });
});

// Root welcome
app.get('/api', (req, res) => {
  res.send('Smart Canteen API is running smoothly.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

// Only start standalone HTTP server when executed directly (not in Vercel serverless)
if (require.main === module && !process.env.VERCEL) {
  const startServer = async () => {
    try {
      await connectDB();
      await seedDatabase();
      isSeeded = true;

      app.listen(PORT, () => {
        console.log(`🚀 Smart Canteen Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  };

  startServer();
}

module.exports = app;
