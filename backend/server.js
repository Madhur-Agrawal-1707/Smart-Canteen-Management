const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
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

// Database auto-connect & seed check middleware
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
    environment: process.env.RENDER ? 'render-service' : process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend static build in production (Single Web Service on Render)
const frontendDistPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  console.log(`📦 Serving static frontend from: ${frontendDistPath}`);
  app.use(express.static(frontendDistPath));

  // Express 5 compatible catch-all for Single Page Application
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(frontendDistPath, 'index.html'));
    }
    next();
  });
} else {
  app.get('/', (req, res) => {
    res.send('Smart Canteen API is running. Build frontend with `npm run build` to serve UI.');
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();
    isSeeded = true;

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Smart Canteen Server running on http://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
