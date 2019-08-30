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

const getProductByCategory = async (req, res) => {
  const { category } = req.params;

  const findCategory = await Category.findOne({ name: category });
  const findProducts = await ProdCat.find({
    category: findCategory._id
  }).populate("product");

  if (findProducts) return res.status(200).json(findProducts);
  else res.status(500).send("Operation failed");
};

module.exports = {
  addCategory,
  addProduct,
  getProductByCategory
};
