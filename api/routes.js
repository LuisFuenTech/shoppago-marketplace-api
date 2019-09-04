const app = require("express").Router();
const { apiController } = require("./index");

//Serving all endpoints for GET requests
app.get("/category/:name", apiController.getProductByCategory);
app.get("/product/products", apiController.getProducts);
app.get("/products-category", apiController.getProductsCat);
app.get("/shopping/cart/:id", apiController.getShopping);
app.get("/product/search", apiController.searchProductbyWords);
app.get("/product/:id", apiController.getProduct);

//Serving all endpoints for POST requests
app.post("/category", apiController.addCategory);
app.post("/product", apiController.addProduct);
app.post("/shopping/buy", apiController.makePurchase);
app.post("/shopping/product", apiController.addProductToShopping);
app.post("/shopping", apiController.addShopping);

//Serving all endpoints for PUT requests
app.put("/product/:id", apiController.updateProduct);

//Serving all endpoints for DELETE requests
app.delete("/product/:id", apiController.deleteProduct);
app.delete(
  "/shopping/product/:shoppingId",
  apiController.deleteProductFromShopping
);

module.exports = app;
