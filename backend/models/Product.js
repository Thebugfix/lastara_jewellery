const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sku: { type: String },
  description: { type: String },
  purity: { type: String },
  weight: { type: Number },
  pricePerGram: { type: Number },
  images: [imageSchema],
  category: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
