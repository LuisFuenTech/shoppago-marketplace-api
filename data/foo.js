function getAlibaba(alibaba) {
  const allProducts = [];

  alibaba.forEach(item => {
    let newItem = {};
    newItem.image = item
      .querySelector(".offer-image-box")
      .childNodes[3].getAttribute("src");
    newItem.description = item.querySelector(".title").childNodes[1].innerText;
    newItem.price = item
      .querySelector(".price")
      .childNodes[1].innerText.split("-")[0];
    newItem.quantity = 100;
    newItem.priceFormated = Number(
      item
        .querySelector(".price")
        .childNodes[1].innerText.split("-")[0]
        .replace("$", "")
    );

    allProducts.push(newItem);
  });

  return allProducts;
}

function getAlibaba(items) {
  const allProducts = [];
  items.map(item => {
    let newItem = {};

    newItem.image =
      "http:" +
      item.querySelector(".offer-image-box").childNodes[3].getAttribute("src");
    newItem.description = item
      .querySelector(".offer-image-box")
      .childNodes[3].getAttribute("alt");
    newItem.price = item
      .querySelector(".price")
      .childNodes[1].innerText.split("-")[0];
    newItem.quantity = 100;
    newItem.priceFormated = Number(
      item
        .querySelector(".price")
        .childNodes[1].innerText.split("-")[0]
        .replace("$", "")
    );
    return newItem;
  });
}

//1
let alibaba = Array.from(
  document.querySelectorAll(".m-gallery-product-item-wrap")
).filter(item => Boolean(item.querySelector(".item-main")));

//2
let allProducts = alibaba.map(item => {
  let newItem = {};

  newItem.image =
    "http:" +
    item.querySelector(".offer-image-box").childNodes[3].getAttribute("src");
  newItem.description = item
    .querySelector(".offer-image-box")
    .childNodes[3].getAttribute("alt");
  newItem.price = item
    .querySelector(".price")
    .childNodes[1].innerText.split("-")[0];
  newItem.quantity = 100;
  newItem.priceFormated = Number(
    item
      .querySelector(".price")
      .childNodes[1].innerText.split("-")[0]
      .replace(/[$,]/gi, "")
  );
  return newItem;
});

//3
JSON.stringify(allProducts);

//Add by JSON
const addProductByJson = async (req, res) => {
  var allProducts = [];
  const { name, categories } = req.body;
  const newJson = require("../data/db8.json");

  for (let [index, category] of categories.entries()) {
    const findCategory = await Category.findOne({ name: category })
      .then(async result => {
        if (result) {
          for (let [index, item] of newJson.entries()) {
            const newProduct = new Product();
            newProduct.name = name.replace(/[\n]/, "");
            newProduct.description = item.description.replace(/[\n]/, "");
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
