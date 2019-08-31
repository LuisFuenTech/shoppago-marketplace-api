const mongoose = require("mongoose");
const { Product, ProdCat, Category, Shopping } = require("../schemas/index");

const addCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({ name: name.toLowerCase() });

  const saved = await newCategory.save();

  if (saved)
    return res.status(201).json({ message: "Category added", item: saved });
  else res.status(500).send("Operation failed");
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
    priceFormtated: Number(priceFormated.replace("$", "")),
    quantity: Number(quantity),
    image: image
  });

  const savedProduct = await newProduct.save();
  console.log("TCL: addProduct -> savedProduct", savedProduct);

  if (savedProduct) {
    for (let [index, category] of categories.entries()) {
      const searchCategory = await Category.findOne({ name: category });
      console.log("TCL: addProduct -> searchCategory", searchCategory);

      if (searchCategory) {
        console.log("TCL: addProduct -> savedProduct._id", savedProduct._id);
        console.log(
          "TCL: addProduct -> searchCategory._id",
          searchCategory._id
        );
        const newProdCat = new ProdCat({
          product: savedProduct._id,
          category: searchCategory._id
        });

        const savedProCat = await newProdCat.save();
        if (savedProCat) prodCat.push(savedProCat);
      }
    }

    return res.status(201).json({ message: "Product added", items: prodCat });
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

const addProductByJson = async (req, res) => {
  var allProducts = [];
  const { name, categories } = req.body;
  console.log("TCL: addProductByJson -> categories", categories);
  console.log("TCL: addProductByJson -> name", name);
  const db = require("../data/db8.json");
  const newJson = JSON.parse(JSON.stringify(db));

  for (let [index, category] of categories.entries()) {
    console.log("TCL: addProductByJson -> category", category);
    console.log("Hey");
    const findCategory = await Category.findOne({ name: category })
      .then(async result => {
        console.log("TCL: addProductByJson -> result", result);
        if (result) {
          for (let [index, item] of newJson.entries()) {
            const newProduct = new Product();
            newProduct.name = name;
            newProduct.description = item.description;
            newProduct.price = item.price;
            newProduct.priceFormated = item.priceFormated;
            newProduct.quantity = item.quantity;
            newProduct.image = item.image;

            //await Promise.all([newProduct.save(),])
            const savedProduct = await newProduct.save();

            if (savedProduct) {
              const newProdCat = new ProdCat({
                product: savedProduct._id,
                category: result._id
              });

              const savedProCat = await newProdCat.save();

              if (savedProCat) {
                allProducts.push(savedProduct);
              }
            }
          }
        }
      })
      .catch(e => {
        res.status(500).json({ e });
      });
  }
  res.status(201).json(allProducts);
};

const getShopping = async (req, res) => {
  const { shoppingId } = req.params;
  const findShopping = await Shopping.findById(shoppingId, {
    select: "-createdAt -updatedAt -__v"
  }).populate({
    path: "products",
    select: "-_id -createdAt -updatedAt -__v",
    populate: { path: "product", select: "-_id -createdAt -updatedAt -__v" }
  });

  if (findShopping) res.status(200).json(findShopping);
  else res.status(404).send(`Shopping cart doesn't exist`);
};

const getProductByCategory = async (req, res) => {
  const { category } = req.params;

  const findCategory = await Category.findOne({ name: category });

  if (findCategory) {
    const findProducts = await ProdCat.find({
      category: findCategory._id
    }).populate({
      path: "product category",
      select: "-_id -createdAt -updatedAt"
    });
    console.log("TCL: getProductByCategory -> findProducts", findProducts);

    if (findProducts.length > 0) return res.status(200).json(findProducts);
    else res.status(404).send(`Category ${category} is empty`);
  } else res.status(404).send(`Category ${category} not found`);
};

const getAllProducts = async (req, res) => {
  const findProducts = await ProdCat.find({}).populate({
    path: "product category",
    select: "-createdAt -updatedAt -__v"
  });

  if (findProducts.length > 0) res.status(200).json(findProducts);
  else res.status(404).send(`There's no prodcuts`);
};

module.exports = {
  addCategory,
  addProduct,
  addShopping,
  addProductByJson,
  getProductByCategory,
  getAllProducts,
  getShopping
};
