const app = require("express").Router();
const { apiController } = require("./index");

app.get("/by-category/category", apiController.getProductByCategory);

app.post("/add-category", apiController.addCategory);
app.post("/add-product", apiController.addProduct);

module.exports = app;
