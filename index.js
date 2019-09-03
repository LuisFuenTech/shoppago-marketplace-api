const { server } = require("./config/index");

//For production purpose
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
