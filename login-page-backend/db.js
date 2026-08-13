const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is missing from .env");
}

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();

    console.log("✅ MongoDB Atlas connected successfully!");

    return client.db("KeenCodic");
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error(error);
    throw error;
  }
}

module.exports = connectDB;