const { SendMail: MailSender } = require("../services");
const { Product, ProdCat, Category, Shopping } = require("../schemas");

/*
  This function add a new category using a name provided for user.
  return a json with the object saved
*/
const addCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({ name: name.toLowerCase() });

  try {
    const categorySaved = await newCategory.save();
    //If the object was successfully added, return 201 code
    return res
      .status(201)
      .json({ message: "Category added", item: categorySaved });
  } catch (error) {
    return res.status(500).json({ message: "Operation failed", error });
  }
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

  try {
    const savedProduct = newProduct.save();
    const searchCategory = Category.findOne({ name: category });

    const result = await Promise.all([savedProduct, searchCategory]);

    //Save reference if previous task is completed, comparing data given by Promise
    if (result) {
      const newProdCat = new ProdCat({
        product: result[0].name != category ? result[0]._id : result[1]._id,
        category: result[0].name == category ? result[0]._id : result[1]._id
      });

      const savedProCat = await newProdCat.save();
      if (savedProCat) prodCat.push(savedProCat);
      return res.status(201).json({ message: "Product added", items: prodCat });
    }
  } catch (error) {
    return res.status(500).send({ message: "Operation failed", error });
  }
};

/*
  This function add a product into the Shopping Caer if this exixts
*/
const addProductToShopping = async (req, res) => {
  const { productId, shoppingId } = req.body;

  try {
    const findShopping = await Shopping.findById(shoppingId);
    const findProdCat = await ProdCat.findById(productId);

    if (findShopping && findProdCat) {
      findShopping.products.push(findProdCat);

      const shoppingUpdated = await Shopping.findByIdAndUpdate(
        shoppingId,
        findShopping,
        { new: true }
      );

      return res.status(201).json(shoppingUpdated);
    } else {
      return res
        .status(500)
        .json({ error: "Shopping cart or product not found", error });
    }
  } catch (error) {
    return res.status(500).json({ error: "Shopping cart not found", error });
  }
};

/*
  This cread a new shopping cart
*/
const addShopping = async (req, res) => {
  const newShopping = new Shopping({ products: [] });

  try {
    const shoppingCreated = await newShopping.save();
    return res
      .status(201)
      .json({ message: "Shopping cart created", shopping: shoppingCreated });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong", error });
  }
};

/* 
  This return a shopping cart (products inside) by its id
*/
const getShopping = async (req, res) => {
  const { id } = req.params;

  try {
    const findShopping = await Shopping.findOne({ _id: id }).populate({
      path: "products",
      populate: { path: "product category" }
    });

    return res.status(200).json(findShopping);
  } catch (error) {
    return res
      .status(404)
      .json({ messsage: `Shopping cart doesn't exist`, error });
  }
};

/*
  Operation recive a name, then looking for that category
  and send all products related to that category
*/
const getProductByCategory = async (req, res) => {
  const { name } = req.params;

  try {
    const findCategory = await Category.findOne({ name: name });

    const findProducts = await ProdCat.find({
      category: findCategory._id
    }).populate({
      path: "product category",
      select: "-__v"
    });

    return res.status(200).json(findProducts);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//Getting the product by its id given via params
const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const findProduct = await Product.findById(id);
    return res.status(200).json(findProduct);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//Get the list of all products
const getProducts = async (req, res) => {
  try {
    const findProducts = await ProdCat.find({}).populate({
      path: "product category",
      select: "-__v"
    });

    return res.status(200).json(findProducts);
  } catch (error) {
    return res.status(400).json(error);
  }
};

/*
  Deleting a product using its id given via params.
  Also delete the document product-category created
*/
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deleteProdCat = ProdCat.findOneAndDelete({ product: id });
  const deleteProduct = Product.findOneAndDelete({ _id: id });

  try {
    const results = await Promise.all([deleteProdCat, deleteProduct]);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
};

/*
  Deleting a product from a shopping cart
*/
const deleteProductFromShopping = async (req, res) => {
  const { shoppingId } = req.params;
  const { productId } = req.query;

  try {
    const findShopping = await Shopping.findById(shoppingId);

    const newProductsList = findShopping.products.filter(
      item => item._id != productId
    );

    const shoppingUpdated = await Shopping.findByIdAndUpdate(
      shoppingId,
      { products: newProductsList },
      { new: true }
    );

    return res.status(200).json({ shoppingUpdated });
  } catch (error) {
    return res.status(404).json(error);
  }
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

    Note: regex (mongo db)
  */
  try {
    const productsFounded = await Product.find({
      $text: { $search: `${words}` }
    });
    return res.status(200).json(productsFounded);
  } catch (error) {
    return res.status(404).json({ error });
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
    return res.status(200).json("Mail sent");
  } catch (error) {
    return res.status(400).json(error);
  }
};

/*
  This one allow update any product, giving the data
  and the id
*/
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const productUpdated = await Product.findOneAndUpdate(id, changes, {
      new: true
    });

    return res
      .status(200)
      .json({ message: "Product updated", product: productUpdated });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  addCategory,
  addProduct,
  addShopping,
  addProductToShopping,
  getProduct,
  getProductByCategory,
  getProducts,
  getShopping,
  searchProductbyWords,
  deleteProduct,
  deleteProductFromShopping,
  makePurchase,
  updateProduct
};
