const hapiAuthJwt2 = require("hapi-auth-jwt2");
const handlers = require("./src/handlers");
const User = require("./src/models/User");

const Hapi = require("@hapi/hapi");
const mongoose = require("mongoose");
const config = require("./config/config");
const Joi = require("@hapi/joi");

const server = new Hapi.Server(config.server);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const validate = async (decoded) => {
  let promise = await new Promise(async (resolve) => {
    await User.findOne({ email: decoded.email }).then((user) => {
      if (!user) {
        resolve({ isValid: false });
      }
      resolve({ isValid: true });
    });
  });
  return promise;
};

const start = async () => {
  try {
    await server.register({
      plugin: require("hapi-cors"),
      options: {
        origins: ["*"],
        methods: ["POST, GET, OPTIONS, DELETE, PUT"],
      },
    });

    await server.start();
  } catch (err) {
    process.exit(1);
  }
  await server.register(hapiAuthJwt2);
  await server.register(require("inert"));

  server.auth.strategy("jwt", "jwt", {
    key: config.jwt.secret,
    validate: validate,
    verifyOptions: {
      algorithms: ["HS256"],
    },
  });
  server.route({
    method: "GET",
    path: "/images/{serialNumber}",
    handler: (request, h) => {
      let path = "./src/uploads/" + request.params.serialNumber;
      return h.file(path);
    },
    config: {
      auth: false,
    },
  });
  server.route({
    method: "POST",
    path: "/product",
    handler: handlers.addProduct,
    config: {
      auth: false,
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          description: Joi.string().required(),
          images: Joi.array().items(Joi.string()),
          price: Joi.number().required(),
          serialNumber: Joi.string().required(),
          totalProducts: Joi.number().required(),
          category: Joi.string().required(),
        }),
      },
    },
  });
  server.route({
    method: "GET",
    path: "/product",
    handler: handlers.getAllProducts,
    config: {
      auth: false,
    },
  });
  server.route({
    method: "GET",
    path: "/product/{id}",
    handler: handlers.getSingleProduct,
    config: {
      auth: false,
    },
  });
  server.route({
    method: "DELETE",
    path: "/product/{id}",
    handler: handlers.deleteProduct,
    config: {
      auth: false,
    },
  });

  server.route({
    method: "PUT",
    path: "/product/{id}",
    handler: handlers.updateProduct,
    config: {
      auth: false,
    },
  });
  server.route({
    method: "GET",
    path: "/report",
    handler: handlers.getReports,
    config: {
      auth: false,
    },
  });
  server.route({
    method: "POST",
    path: "/login",
    handler: handlers.loginUser,
    config: {
      auth: false,
    },
  });
  server.route({
    method: "POST",
    path: "/order",
    handler: handlers.orderProduct,
    config: {
      auth: false,
    },
  });
  server.route({
    method: "POST",
    path: "/rating/{id}",
    handler: handlers.addRating,
    config: {
      auth: false,
    },
  });
  server.route({
    method: "POST",
    path: "/register",
    handler: handlers.registerUser,
    config: {
      auth: false,
    },
  });
  server.auth.default("jwt");

  await server.start((err) => {
    if (err) {
      throw err;
    }
  });
};

start();
