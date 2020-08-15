const Product = require("../../models/Product");

const addRating = request => {
  let promise = new Promise(resolve => {
    Product.findById(request.params.id)
      .then(response => {
        if (response) {
          response.rating.push({
            name: request.payload.name,
            rating: request.payload.rating,
            comment: request.payload.comment
          });
          response.save();
          resolve({
            success: true,
            message: "Your feedback has been recorded. Thank you ❤️"
          });
        }
      })
      .catch(error => {
        resolve({
          success: false,
          message: "There was a problem saving your comment."
        });
      });
  });
  return promise;
};

module.exports = addRating;
