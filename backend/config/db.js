const mongoose = require('mongoose');

let isInMemory = false;

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smart-canteen';

  try {
    // Attempt standard connection with 2.5s timeout
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`✅ MongoDB Connected to: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (err) {
    console.warn(`⚠️ Could not connect to local/Atlas MongoDB (${mongoUri}): ${err.message}`);
    console.log('🔄 Launching zero-config in-memory MongoDB fallback for smooth presentation...');
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      const conn = await mongoose.connect(memoryUri);
      isInMemory = true;
      console.log(`✅ In-Memory MongoDB Connected at: ${memoryUri}`);
      console.log('💡 Tip: Any data created during this session will be preserved while server runs.');
      return conn;
    } catch (memErr) {
      console.error('❌ Failed to start in-memory MongoDB server:', memErr.message);
      throw memErr;
    }
  }
};

module.exports = { connectDB };
