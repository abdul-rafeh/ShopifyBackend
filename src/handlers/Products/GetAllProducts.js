const Product = require("../../models/Product");

const getAllProducts = request => {
  let promise = new Promise(resolve => {
    Product.find()
      .then(response => {
        resolve({ success: true, message: response });
      })
      .catch(error => {
        resolve({ success: false, message: error });
      });
  });
  return promise;
};

module.exports = getAllProducts;
