const User = require("../models/User");

const registerUser = (request) => {
  let promise = new Promise((resolve) => {
    // User.create({ email: request.payload.email })
    //   .then(response => {
    //     if (response && response.password === request.payload.password) {
    //       resolve({ success: true, message: response });
    //     } else {
    //       resolve({ success: false, message: "Invalid username or password" });
    //     }
    //   })
    //   .catch(error => {
    //     resolve({ success: false, message: error });
    //   });
    let user = new User(request.body);
    user
      .save()
      .then((response) => {
        resolve({ success: true, message: "Registered you successfully" });
      })
      .catch((error) => {
        resolve({ success: false, message: error });
      });
  });
  return promise;
};

module.exports = registerUser;
