const mongoose = require("mongoose");

const productScheme = new mongoose.Schema({
  name: String,
  description: String,
  images: [String],
  price: Number,
  serialNumber: String,
  totalProducts: Number,
  category: String,
  views: {
    type: Number,
    required: false,
    default: 0
  },
  rating: [
    {
      name: String,
      rating: Number,
      comment: String
    }
  ]
});

module.exports = mongoose.model("Product", productScheme);
