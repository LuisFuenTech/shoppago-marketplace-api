const mongoose = require("mongoose");
const MailSender = require("../services/sendMail");
const { Product, ProdCat, Category, Shopping } = require("../schemas/index");

/*
  This function add a new category using a name provided for user.
  return a json with the object saved¿
*/
const addCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({ name: name.toLowerCase() });
  const categorySaved = await newCategory.save();

  //If the object was successfully added, return 201 code
  categorySaved
    ? res.status(201).json({ message: "Category added", item: categorySaved })
    : res.status(500).send("Operation failed");
};

/*
  This function is used for add a new product, using the data
  provided for user.
  Important: The category given have to be created first, because
  and intermedite object is create, th eone who store the id of the
  category and product created
*/
const addProduct = async (req, res) => {
  const prodCat = [];
  const {
    name,
    description,
    price,
    priceFormated,
    quantity,
    image,
    category
  } = req.body;

  /*
  Creating a new producto, using regex for formating.
  value image is the url of the product's image
  */
  const newProduct = new Product({
    name: name,
    description: description,
    price: price,
    priceFormtated: Number(priceFormated.replace(/[$,]/gi, "")),
    quantity: Number(quantity),
    image: image
  });

  const savedProduct = newProduct.save();
  const searchCategory = Category.findOne({ name: category });

  const result = await Promise.all([savedProduct, searchCategory]);

  //Save reference if previous task is completed, comparing data given by Promise
  if (result) {
    const newProdCat = new ProdCat({
      product: result[0].name != category ? result[0]._id : result[1],
      category: result[0].name == category ? result[0]._id : result[1]
    });

    const savedProCat = await newProdCat.save();
    if (savedProCat) prodCat.push(savedProCat);
    res.status(201).json({ message: "Product added", items: prodCat });
  } else res.status(500).send("Operation failed");
};

/*
  This function add a product into the Shopping Caer if this exixts
*/
const addProductToShopping = async (req, res) => {
  const { productId, shoppingId } = req.body;
  const findShopping = await Shopping.findById(shoppingId);

  if (findShopping) {
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

/*
  This cread a new shopping cart
*/
const addShopping = async (req, res) => {
  const newShopping = new Shopping({ products: [] });
  const shoppingCreated = await newShopping.save();

  shoppingCreated
    ? res
        .status(201)
        .json({ message: "Shopping cart created", shopping: shoppingCreated })
    : res.status(400).json({ error: "Something went wrong" });
};

/* 
  This return a shopping cart (products inside) by its id
*/
const getShopping = async (req, res) => {
  const { id } = req.params;
  const findShopping = await Shopping.findOne({ _id: id }).populate({
    path: "productcategories"
  });

  findShopping
    ? res.status(200).json(findShopping)
    : res.status(404).send(`Shopping cart doesn't exist`);
};

/*
  Operation recive a name, then looking for that category
  and send all products related to that category
*/
const getProductByCategory = async (req, res) => {
  const { name } = req.params;

  const findCategory = await Category.findOne({ name: name });

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

//Getting the product by its id given via params
const getProduct = async (req, res) => {
  const { id } = req.params;
  const findProduct = await Product.findById(id);

  findProduct
    ? res.status(200).json(findProduct)
    : res.status(404).json({ error: "Product not found" });
};

//Get the list of all products
const getProducts = async (req, res) => {
  const findProducts = await Product.find({});

  console.log("Counts of products:", findProducts.length);

  findProducts.length > 0
    ? res.status(200).json(findProducts)
    : res.status(404).send(`There's no prodcuts`);
};

//Get the data populated on product and category
const getProductsCat = async (req, res) => {
  const findProducts = await ProdCat.find({}).populate({
    path: "product category",
    select: "-__V"
  });

  findProducts.length > 0
    ? res.status(200).json(findProducts)
    : res.status(404).send({ error: `There's no prodcuts` });
};

/*
  Deleting a product using its id given via params.
  Also delete de document product-category created
*/
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deleteProdCat = ProdCat.findOneAndDelete({ product: id });
  const deleteProduct = Product.findOneAndDelete({ _id: id });

  const results = await Promise.all([deleteProdCat, deleteProduct]);

  Boolean(results[1])
    ? res.status(200).json(results)
    : res.status(400).send({ error: "Product already removed" });
};

/*
  Deleting a product from a shopping cart
*/
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

/*
  Searching products that match with the words
  given via query string
*/
const searchProductbyWords = async (req, res) => {
  const { words } = req.query;

  /*
    For this operation, I creat a index type text on mongoDB,
    pointing to the product description
  */
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

/*
  This make the updates when someone complete
  the purchase. Then, send a email
*/
const makePurchase = async (req, res) => {
  const updated = [];
  const { cart, subtotal, email } = req.body;

  const shoppingCart = JSON.parse(cart);

  for (let [index, product] of shoppingCart.entries()) {
    const { count } = product;
    const findProduct = await Product.findById(product._id);

    //I need to decrement de stock of the product
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

/*
  This one allow update any product, giving the data
  and the id
*/
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  const productUpdated = await Product.findOneAndUpdate(id, changes, {
    new: true
  });

  productUpdated
    ? res
        .status(200)
        .json({ message: "Product updated", product: productUpdated })
    : res.status(400).send("Updated failed");
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
  updateProduct
};
