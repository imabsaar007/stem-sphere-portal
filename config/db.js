const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const connections = {};

const connecttoDB = async () => {
  try {
    const donorDBURI = process.env.MONGODB_URI;
    const kitRequestDBURI = process.env.MONGO_URI;

    if (!donorDBURI || !kitRequestDBURI) {
      throw new Error('One or both MongoDB URIs are missing in environment variables');
    }

    // Create connection for DonorDB
    connections.donorDB = mongoose.createConnection(donorDBURI, {
    //   /useNewUrlParser: true,
    //   useUnifiedTopology: true
    });

    // Create connection for KitRequestDB
    connections.kitRequestDB = mongoose.createConnection(kitRequestDBURI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    });

    // Event handlers for DonorDB
    connections.donorDB.on('error', (error) => {
      console.error('DonorDB connection error:', error);
    });
    connections.donorDB.once('open', () => {
      console.log('Connected to DonorDB');
    });

    // Event handlers for KitRequestDB
    connections.kitRequestDB.on('error', (error) => {
      console.error('KitRequestDB connection error:', error);
    });
    connections.kitRequestDB.once('open', () => {
      console.log('Connected to KitRequestDB');
    });
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = { connecttoDB, connections };