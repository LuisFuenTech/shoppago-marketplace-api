const app = require("express").Router();
const { apiController } = require("./index");

app.get("/category/:name", apiController.getProductByCategory);
app.get("/product/products", apiController.getProducts);
app.get("/products-category", apiController.getProductsCat);
app.get("/shopping/cart/:id", apiController.getShopping);
app.get("/product/search", apiController.searchProductbyWords);
app.get("/product/:id", apiController.getProduct);

app.post("/category", apiController.addCategory);
app.post("/product", apiController.addProduct);
app.post("/shopping/buy", apiController.makePurchase);
app.post("/shopping/product", apiController.addProductToShopping);
app.post("/shopping", apiController.addShopping);

app.put("/product/:id", apiController.updateProduct);

app.delete("/product/:id", apiController.deleteProduct);
app.delete(
  "/shoppig/product/:shoppingId",
  apiController.deleteProductFromShopping
);

app.get("/deleteAll", apiController.deleteAll);
app.get("/https", apiController.updateHttps);
app.post("/json", apiController.addProductByJson);

module.exports = app;
