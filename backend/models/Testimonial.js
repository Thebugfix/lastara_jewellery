const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: String,
  message: String,
  image: { url: String, public_id: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
