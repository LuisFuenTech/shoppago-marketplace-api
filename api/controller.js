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

const addShopping = async (req, res) => {
  const { productsId } = req.body;
  const newShopping = new Shopping();

  productsId.forEach(id => {
    newShopping.products.push(mongoose.Types.ObjectId(id));
  });

  const savedShopping = await newShopping.save();

  if (savedShopping) return res.status(201).json(savedShopping);
  else res.status(500).send("Something went wrong!");
};

const getShopping = async (req, res) => {
  const { shoppingId } = req.params;
  const findShopping = await Shopping.findById(shoppingId).populate({
    path: "products",
    select: "-__v",
    populate: { path: "product", select: "-__v" }
  });

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

  try {
    const results = await Promise.all([deleteProdCat, deleteProduct]);
    res.status(200).json(results);
  } catch (error) {
    res.status(400).send("Opetation has failed", error);
  }
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
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error });
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

  res.status(200).send("No back again");
};

const addProductByJson = async (req, res) => {
  var allProducts = [];
  const { categories } = req.body;
  const newJson = require("../data/food.json");

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
    const savedProduct = await newProduct.save();

    if (savedProduct) {
      for (let [index, category] of categories.entries()) {
        const findCategory = await Category.findOne({ name: category });

        if (findCategory) {
          const newProdCat = new ProdCat({
            product: savedProduct._id,
            category: findCategory._id
          });

          const savedProCat = await newProdCat.save();
          savedProCat ? allProducts.push(savedProduct) : null;
        }
      }
    } //if savedProduct
  }
  res.status(201).json(allProducts);
};

module.exports = {
  addCategory,
  addProduct,
  addShopping,
  getProductByCategory,
  getProducts,
  getProductsCat,
  getShopping,
  searchProductbyWords,
  deleteProduct,
  makePurchase,
  updateProduct,
  deleteAll,
  addProductByJson
};
