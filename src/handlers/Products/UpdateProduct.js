const Product = require("../../models/Product");

const updateProduct = request => {
  let promise = new Promise(resolve => {
    Product.findByIdAndUpdate(request.params.id, request.payload)
      .then(response => {
        resolve({ success: true, message: response });
      })
      .catch(error => {
        resolve({ success: false, message: error });
      });
  });
  return promise;
};

module.exports = updateProduct;
