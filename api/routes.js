const app = require("express").Router();
const { apiController } = require("./index");

app.get("/by-category/:category", apiController.getProductByCategory);
app.get("/products", apiController.getAllProducts);

app.post("/add-category", apiController.addCategory);
app.post("/add-product", apiController.addProduct);
app.post("/add-json", apiController.addProductByJson);

module.exports = app;
