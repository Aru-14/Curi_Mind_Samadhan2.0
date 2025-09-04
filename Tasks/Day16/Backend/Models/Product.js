const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }, // store in cents for precision
  description: { type: String },
  imageUrl: { type: String },
  stock: { type: Number, default: 0 }, // quantity available
  category: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);