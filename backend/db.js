const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
    const stats = await mongoose.connection.db.stats();
    console.log("Storage Size:", formatBytes(stats.storageSize));
    console.log("Data Size:", formatBytes(stats.dataSize));
    console.log("Index Size:", formatBytes(stats.indexSize));
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

function formatBytes(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

module.exports = connectDB;
