module.exports = {
  database: "mongodb://localhost:27017/web-project",
  server: {
    port: 8888,
    host: "localhost",
  },
  jwt: {
    secret: "rafeh123",
    expiresIn: "1d",
  },
};
