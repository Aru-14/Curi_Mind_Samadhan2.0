// db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config(); 
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // stop the app if DB fails
  }
};

module.exports = connectDB;
