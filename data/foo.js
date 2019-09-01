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
