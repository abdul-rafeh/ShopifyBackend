const accountSid = "AC0ced644b780d187270787c04700be3f1";
const authToken = "c210a3204af81d947b0f1ce740166299";

var nodemailer = require("nodemailer");
const client = require("twilio")(accountSid, authToken);

var transporter = nodemailer.createTransport({
  host: "mail.hybridsquares.com",
  port: 465,
  auth: {
    user: "abdulrafeh@hybridsquares.com",
    pass: "3C2rQvqKw(&7",
  },
});

const orderProduct = (request) => {
  let promise = new Promise((resolve) => {
    if (request && request.payload) {
      let body =
        request.payload.name +
        " ordered " +
        request.payload.quantity +
        " " +
        request.payload.productName +
        " from your store with Serial Number: " +
        request.payload.serialNumber +
        " you can contact the user using this phone number " +
        request.payload.phoneNumber;

      var mailOptions = {
        from: "abdulrafeh@hybridsquares.com",
        to: "abdulrafeh@live.co.uk",
        subject: "Order Item " + request.payload.serialNumber,
        text: body,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      client.messages
        .create({
          body: body,
          from: "+12396036783",
          to: "+923228444733",
        })
        .then((message) => {
          console.log(message);
          resolve({
            success: true,
            message:
              "Your order has been placed 🕺🏻. ھمارا نماہندآپ سے جلد رابطہ کرے گا۔شکریہ۔ 🤗",
          });
        })
        .catch((error) => {
          resolve({
            success: false,
            message:
              "We were unable to place your order. Please try again later",
          });
        });
    }
  });
  return promise;
};

module.exports = orderProduct;
