const app = require("express").Router();
const { apiController } = require("./index");

app.get("/category/:name", apiController.getProductByCategory);
app.get("/product/products", apiController.getProducts);
app.get("/products-category", apiController.getProductsCat);
app.get("/shopping/:id", apiController.getShopping);
app.get("/product/search", apiController.searchProductbyWords);

app.post("/category", apiController.addCategory);
app.post("/product", apiController.addProduct);
app.post("/shopping", apiController.addShopping);
app.post("/shopping/buy", apiController.makePurchase);

app.put("/product/:id", apiController.updateProduct);

app.delete("/product/:id", apiController.deleteProduct);
app.get("/deleteAll", apiController.deleteAll);
app.post("/json", apiController.addProductByJson);

module.exports = app;
