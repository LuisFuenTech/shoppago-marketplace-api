const { server } = require("./config/index");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
