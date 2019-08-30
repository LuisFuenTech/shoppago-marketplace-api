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

  console.log("TCL: addProduct -> categories", categories);
  console.log("TCL: addProduct -> image", image);
  console.log("TCL: addProduct -> quantity", quantity);
  console.log("TCL: addProduct -> priceFormated", priceFormated);
  console.log("TCL: addProduct -> price", price);
  console.log("TCL: addProduct -> description", description);
  console.log("TCL: addProduct -> name", name);

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

const addProductByJson = async (req, res) => {
  const allProducts = [];
  const { name } = req.body;
  const db = require("../data/db.json");
  const newJson = JSON.parse(JSON.stringify(db));

  for (let [index, item] of newJson.entries()) {
    const newProduct = new Product();
    newProduct.name = name;
    newProduct.description = item.description;
    newProduct.price = item.price;
    newProduct.priceFormated = Number(item.priceFormated);
    newProduct.quantity = item.quantity;
    newProduct.image = item.image;

    const savedProduct = await newProduct.save();
    allProducts.push(savedProduct);
  }

  res.status(201).json(allProducts);
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
    select: "-_id -createdAt -updatedAt -__v"
  });

  if (findProducts.length > 0) res.status(200).json(findProducts);
  else res.status(404).send(`There's no prodcuts`);
};

module.exports = {
  addCategory,
  addProduct,
  addProductByJson,
  getProductByCategory,
  getAllProducts
};
