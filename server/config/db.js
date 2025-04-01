const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log('Server will continue running without database connection. Some features may not work.');
    // Don't exit the process to allow server to run without DB
  }
};

module.exports = connectDB;
