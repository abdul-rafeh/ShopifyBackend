const Product = require("../../models/Product");

const getSingleProduct = request => {
  let promise = new Promise(resolve => {
    Product.findById(request.params.id)
      .then(response => {
        response.views = response.views + 1;
        response.save();
        resolve({ success: true, message: response });
      })
      .catch(error => {
        resolve({ success: false, message: error });
      });
  });
  return promise;
};

module.exports = getSingleProduct;
