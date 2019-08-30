const { server } = require("./config/index");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const db = require("./data/db.json");
const newJson = JSON.parse(JSON.stringify(db));
