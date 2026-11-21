const mongoose = require('mongoose');

let cached = global.__mongooseCache;
if (!cached) {
  cached = global.__mongooseCache = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn && mongoose.connection.readyState >= 1) {
    return cached.conn;
  }

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smart-canteen';

  if (!cached.promise) {
    cached.promise = (async () => {
      try {
        const conn = await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: 3000,
          bufferCommands: false,
        });
        console.log(`✅ MongoDB Connected to: ${conn.connection.host}/${conn.connection.name}`);
        return conn;
      } catch (err) {
        // If in serverless (Vercel), log warning that Atlas MONGODB_URI is required
        if (process.env.VERCEL) {
          console.error(`❌ MONGODB_URI connection failed on Vercel: ${err.message}. Please configure MONGODB_URI in Vercel Project Settings.`);
          throw err;
        }

        console.warn(`⚠️ Could not connect to local/Atlas MongoDB (${mongoUri}): ${err.message}`);
        console.log('🔄 Launching zero-config in-memory MongoDB fallback...');
        
        try {
          const { MongoMemoryServer } = require('mongodb-memory-server');
          const mongod = await MongoMemoryServer.create();
          const memoryUri = mongod.getUri();
          const conn = await mongoose.connect(memoryUri);
          console.log(`✅ In-Memory MongoDB Connected at: ${memoryUri}`);
          return conn;
        } catch (memErr) {
          console.error('❌ Failed to start in-memory MongoDB server:', memErr.message);
          throw memErr;
        }
      }
    })();
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
};

module.exports = { connectDB };
