const mongoose = require("mongoose");
const { Product, ProdCat, Category, Shopping } = require("../schemas/index");
const MailSender = require("../services/sendMail");

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
  const db = require("../data/db8.json");
  const newJson = JSON.parse(JSON.stringify(db));

  for (let [index, category] of categories.entries()) {
    const findCategory = await Category.findOne({ name: category })
      .then(async result => {
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
      select: " -createdAt -updatedAt"
    });

    if (findProducts.length > 0) return res.status(200).json(findProducts);
    else res.status(404).send(`Category ${category} is empty`);
  } else res.status(404).send(`Category ${category} not found`);
};

const getProducts = async (req, res) => {
  const findProducts = await Product.find({});

  if (findProducts.length > 0) res.status(200).json(findProducts);
  else res.status(404).send(`There's no prodcuts`);
};

const getProductsCat = async (req, res) => {
  const findProducts = await ProdCat.find({}).populate({
    path: "product category",
    select: "-_id -createdAt -updatedAt"
  });

  if (findProducts.length > 0) res.status(200).json(findProducts);
  else res.status(404).send(`There's no prodcuts`);
};

const deleteTrash = async (req, res) => {
  const result = await Product.deleteMany({ description: "new product" });

  res.status(200).json(result);
};

const searchProduct = async (req, res) => {
  const { words } = req.query;
  try {
    const productsFounded = await Product.find({
      $text: { $search: `${words}` }
    });

    productsFounded.length > 0
      ? res.status(200).json(productsFounded)
      : res.status(404).send("Not found");
  } catch (error) {}
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

  await MailSender.sendMail(email, subtotal, shoppingCart);

  res.status(200).json(updated);
};

/* const forDev = async (req, res) => {
  const objects = [];
  const findProducts = await Product.find({});

  if (findProducts.length > 0) {
    for (let [index, item] of findProducts.entries()) {
      const priceFormated = Number(item.price.replace(/[$,]/g, ""));
      console.log("TCL: forDev -> priceFormated", priceFormated);

      const updateProduct = await Product.findByIdAndUpdate(
        item._id,
        { priceFormated: priceFormated },
        { new: true }
      );

      objects.push(updateProduct);
    }
    res.status(200).json(objects);
  } else res.status(400).send("Ops!");
}; */

module.exports = {
  addCategory,
  addProduct,
  addShopping,
  addProductByJson,
  getProductByCategory,
  getProducts,
  getProductsCat,
  getShopping,
  searchProduct,
  deleteTrash,
  makePurchase
};
