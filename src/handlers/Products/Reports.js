const Product = require("../../models/Product");

const getReports = request => {
  let promise = new Promise(resolve => {
    Product.find()
      .then(response => {
        let categories = [
          { name: "Clothes", count: 0 },
          { name: "Watches", count: 0 },
          { name: "Kitchen Items", count: 0 },
          { name: "Cosmetics", count: 0 },
          { name: "Groceries", count: 0 },
          { name: "Technology", count: 0 }
        ];
        let categoriesViews = [
          { name: "Clothes", count: 0 },
          { name: "Watches", count: 0 },
          { name: "Kitchen Items", count: 0 },
          { name: "Cosmetics", count: 0 },
          { name: "Groceries", count: 0 },
          { name: "Technology", count: 0 }
        ];
        let outOfStockItems = 0;
        categories.map(item => {
          let count = 0;
          response.map(product => {
            if (product.category === item.name) {
              count++;
            }
          });
          item.count = count;
        });
        categoriesViews.map(item => {
          let count = 0;
          response.map(product => {
            if (product.category === item.name) {
              count = count + product.views;
            }
          });
          item.count = count;
        });
        let totalViews = 0;
        response.map(item => {
          totalViews = totalViews + item.views;
          if (item.totalProducts === 0) {
            outOfStockItems++;
          }
        });
        let sendResponse = {
          count: categories,
          totalProducts: response.length,
          outOfStockItems: outOfStockItems,
          categoriesViews,
          totalViews
        };

        resolve({ success: true, message: sendResponse });
      })
      .catch(error => {
        resolve({ success: false, message: error });
      });
  });
  return promise;
};

module.exports = getReports;
