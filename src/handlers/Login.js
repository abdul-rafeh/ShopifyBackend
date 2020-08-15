const User = require("../models/User");

const loginUser = request => {
  let promise = new Promise(resolve => {
    User.findOne({ email: request.payload.email })
      .then(response => {
        if (response && response.password === request.payload.password) {
          resolve({ success: true, message: response });
        } else {
          resolve({ success: false, message: "Invalid username or password" });
        }
      })
      .catch(error => {
        resolve({ success: false, message: error });
      });
  });
  return promise;
};

module.exports = loginUser;
