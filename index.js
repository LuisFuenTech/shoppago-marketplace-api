//For production purpose
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { server } = require("./config/index");
