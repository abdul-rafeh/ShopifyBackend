const Product = require("../../models/Product");
const fs = require("fs");

const createProduct = request => {
  let promise = new Promise(resolve => {
    Product.findOne({ serialNumber: request.payload.serialNumber }).then(
      response => {
        if (response) {
          resolve({
            success: false,
            message: "Product already exists with this serial number"
          });
        } else {
          let payload = request.payload;
          let paths = [];
          payload.images.map((item, key) => {
            let buff = new Buffer(item, "base64");
            let url =
              "src/uploads/" + payload.serialNumber + "_" + key + ".jpg";
            fs.writeFileSync(url, buff);
            paths.push("/images/" + payload.serialNumber + "_" + key + ".jpg");
          });
          payload.images = paths;
          const product = new Product(payload);
          product
            .save()
            .then(response => {
              resolve({
                success: true,
                data: response,
                message: "Product inserted successfully"
              });
            })
            .catch(error => {
              resolve({ success: false, message: error });
            });
        }
      }
    );
  });
  return promise;
};

module.exports = createProduct;
