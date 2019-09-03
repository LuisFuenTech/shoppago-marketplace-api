const mongoose = require("mongoose");
const { Product, ProdCat, Category, Shopping } = require("../schemas/index");
const MailSender = require("../services/sendMail");

const addCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({ name: name.toLowerCase() });

  const saved = await newCategory.save();

  saved
    ? res.status(201).json({ message: "Category added", item: saved })
    : res.status(500).send("Operation failed");
};

const addProduct = async (req, res) => {
  const prodCat = [];
  const {
    name,
    description,
    price,
    priceFormated,
    quantity,
    image,
    categories
  } = req.body;

  const newProduct = new Product({
    name: name,
    description: description,
    price: price,
    priceFormtated: Number(priceFormated.replace(/[$,]/gi, "")),
    quantity: Number(quantity),
    image: image
  });

  const savedProduct = await newProduct.save();

  if (savedProduct) {
    for (let [index, category] of categories.entries()) {
      const searchCategory = await Category.findOne({ name: category });

      if (searchCategory) {
        const newProdCat = new ProdCat({
          product: savedProduct._id,
          category: searchCategory._id
        });

        const savedProCat = await newProdCat.save();
        if (savedProCat) prodCat.push(savedProCat);
      }
    }
    res.status(201).json({ message: "Product added", items: prodCat });
  } else res.status(500).send("Operation failed");
};

const addProductToShopping = async (req, res) => {
  const { productId, shoppingId } = req.body;
  const findShopping = await Shopping.findById(shoppingId);
  console.log("TCL: addProductToShopping -> findShopping", findShopping);

  if (findShopping) {
    /* const products = [...findShopping.products];
    products.push(productId);
    findShopping.products = products; */

    findShopping.products.push(mongoose.Types.ObjectId(productId));

    const shoppingUpdated = await Shopping.findByIdAndUpdate(
      shoppingId,
      findShopping,
      { new: true }
    );

    shoppingUpdated
      ? res.status(201).json(shoppingUpdated)
      : res.status(404).send("Something went wrong!");
  } else res.status(404).json({ error: "Shopping cart not found" });
};

const addShopping = async (req, res) => {
  const newShopping = new Shopping({ products: [] });
  const shoppingCreated = await newShopping.save();

  shoppingCreated
    ? res.status(201).json(shoppingCreated._id)
    : res.status(400).json({ error: "Something went wrong" });
};

const getShopping = async (req, res) => {
  const { id } = req.params;
  console.log("TCL: getShopping -> shoppingId", id);
  const findShopping = await Shopping.findById(id).populate({
    path: "ProductCategory",
    select: "-__v"
  });
  console.log("TCL: getShopping -> findShopping", findShopping);

  findShopping
    ? res.status(200).json(findShopping)
    : res.status(404).send(`Shopping cart doesn't exist`);
};

const getProductByCategory = async (req, res) => {
  const { name } = req.params;
  console.log("TCL: getProductByCategory -> name", name);

  const findCategory = await Category.findOne({ name: name });
  console.log("TCL: getProductByCategory -> findCategory", findCategory);

  if (findCategory) {
    const findProducts = await ProdCat.find({
      category: findCategory._id
    }).populate({
      path: "product category",
      select: "-__v"
    });

    findProducts.length > 0
      ? res.status(200).json(findProducts)
      : res.status(404).send(`Category ${category} is empty`);
  } else res.status(404).send(`Category ${category} not found`);
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  const findProduct = await Product.findById(id);

  findProduct
    ? res.status(200).json(findProduct)
    : res.status(404).json({ error: "Product not found" });
};

const getProducts = async (req, res) => {
  const findProducts = await Product.find({});

  console.log("Counts of products:", findProducts.length);

  findProducts.length > 0
    ? res.status(200).json(findProducts)
    : res.status(404).send(`There's no prodcuts`);
};

const getProductsCat = async (req, res) => {
  const findProducts = await ProdCat.find({}).populate({
    path: "product category",
    select: "-__V"
  });

  console.log("Counts of Products/Category", findProducts.length);

  findProducts.length > 0
    ? res.status(200).json(findProducts)
    : res.status(404).send(`There's no prodcuts`);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("TCL: deleteProduct -> id", id);
  const deleteProdCat = ProdCat.findOneAndDelete({ product: id });
  const deleteProduct = Product.findOneAndDelete({ _id: id });

  const results = await Promise.all([deleteProdCat, deleteProduct]);

  Boolean(results[1])
    ? res.status(200).json(results)
    : res.status(400).send({ error: "Product already removed" });
};

const deleteProductFromShopping = async (req, res) => {
  const { shoppingId } = req.params;
  const { productId } = req.query;

  const findShopping = await Shopping.findById(shoppingId);

  if (findShopping) {
    const newProductsList = findShopping.products.filter(
      item => item._id != productId
    );
    const shoppingUpdated = await Shopping.findByIdAndUpdate(
      shoppingId,
      { products: newProductsList },
      { new: true }
    );

    shoppingUpdated
      ? res.status(200).json({ shoppingUpdated })
      : res.status(500).json({ error: "Couldn't process" });
  } else res.status(404).json({ error: "Shopping not found" });
};

const searchProductbyWords = async (req, res) => {
  const { words } = req.query;

  try {
    const productsFounded = await Product.find({
      $text: { $search: `${words}` }
    });

    productsFounded.length > 0
      ? res.status(200).json(productsFounded)
      : res.status(404).send("Not found");
  } catch (error) {
    res.status(404).json({ error });
  }
};

const makePurchase = async (req, res) => {
  const updated = [];
  const { cart, subtotal, email } = req.body;

  const shoppingCart = JSON.parse(cart);

  for (let [index, product] of shoppingCart.entries()) {
    const { count } = product;
    const findProduct = await Product.findById(product._id);

    if (findProduct) {
      const updateProduct = await Product.findByIdAndUpdate(
        findProduct._id,
        { quantity: findProduct.quantity - count },
        { new: true }
      );
      updated.push(updateProduct);
    }
  }

  try {
    await MailSender.sendMail(email, subtotal, shoppingCart);
    res.status(200).send("Mail sent");
  } catch (error) {
    res.status(400).send("error: " + error);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  const productUpdated = await Product.findOneAndUpdate(id, changes, {
    new: true
  });

  productUpdated
    ? res.status(200).json(productUpdated)
    : res.status(400).send("Updated failed");
};

const deleteAll = async (req, res) => {
  await Product.deleteMany({});
  await ProdCat.deleteMany({});
  await Shopping.deleteMany({});
  await Category.deleteMany({});

  res.status(200).send("No back again");
};

const addProductByJson = async (req, res) => {
  var allProducts = [];
  const { category } = req.body;
  const newJson = require("../data/furniture.json");

  for (let [index, item] of newJson.entries()) {
    const newProduct = new Product();

    newProduct.name = item.description
      .replace(/[\n]/, "")
      .split(" ")
      .slice(0, 3)
      .join(" ");
    newProduct.description = item.description.replace(/[\n]/, "");
    newProduct.price = item.price;
    newProduct.priceFormated = item.priceFormated;
    newProduct.quantity = item.quantity;
    newProduct.image = item.image;
    const savedProduct = newProduct.save();
    const findCategory = await Category.findOne({ name: category });

    const result = await Promise.all([savedProduct, findCategory]);
    console.log("TCL: result", result);

    if (Boolean(result[1])) {
      const newProdCat = new ProdCat({
        product: result[0].name != category ? result[0]._id : result[1],
        category: result[0].name == category ? result[0]._id : result[1]
      });

      const savedProCat = await newProdCat.save();
      savedProCat ? allProducts.push(savedProCat) : null;
    } else res.status(500).json({ error: "Something went wrong" });
  }
  res.status(201).json(allProducts);
};

const updateHttps = async (req, res) => {
  const updated = [];
  const findProducts = await Product.find({});

  if (findProducts.length > 0) {
    for (let [index, item] of findProducts.entries()) {
      const https = item.image.replace(/http:\/\//, "https://");
      console.log(https);
      const updateItem = await Product.findOneAndUpdate(
        { _id: item._id },
        { image: https },
        { new: true }
      );
      updateItem ? updated.push(updateItem) : null;
    }
  }
  res.status(200).json(updated);
};

module.exports = {
  addCategory,
  addProduct,
  addShopping,
  addProductToShopping,
  getProduct,
  getProductByCategory,
  getProducts,
  getProductsCat,
  getShopping,
  searchProductbyWords,
  deleteProduct,
  deleteProductFromShopping,
  makePurchase,
  updateProduct,
  deleteAll,
  addProductByJson,
  updateHttps
};
