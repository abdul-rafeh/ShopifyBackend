const mongoose = require("mongoose");

const statsScheme = new mongoose.Schema({
  totalProducts: Number,
  earnedMoney: Number,
  productSold: Number,
  productsInStock: Number
});

module.exports = mongoose.model("Stats", statsScheme);
