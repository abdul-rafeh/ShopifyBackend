const Product = require("../../models/Product");

const deleteProduct = request => {
  let promise = new Promise(resolve => {
    Product.findOneAndDelete({ _id: request.params.id })
      .then(response => {
        if (response) {
          resolve({ success: true, message: "Deleted product successfully" });
        } else {
          resolve({
            success: false,
            message: "There is no product against this id"
          });
        }
      })
      .catch(error => {
        resolve({ success: false, message: error });
      });
  });
  return promise;
};

module.exports = deleteProduct;
