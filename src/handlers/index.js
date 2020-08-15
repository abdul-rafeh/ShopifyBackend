const addProduct = require("./Products/AddProduct");
const getAllProducts = require("./Products/GetAllProducts");
const deleteProduct = require("./Products/DeleteProduct");
const updateProduct = require("./Products/UpdateProduct");
const getSingleProduct = require("./Products/GetASingleProduct");
const getReports = require("./Products/Reports");
const loginUser = require("./Login");
const registerUser = require("./Register");
const orderProduct = require("./OrderItem");
const addRating = require("./Products/AddRating");

module.exports = {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  getReports,
  loginUser,
  orderProduct,
  addRating,
  registerUser,
};
