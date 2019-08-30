function getAlibaba(alibaba) {
  const allProducts = [];

  alibaba.forEach(item => {
    let newItem = {};
    newItem.image = item
      .querySelector(".offer-image-box")
      .childNodes[3].getAttribute("src");
    newItem.description = item.querySelector(
      ".title"
    ).childNodes[1].innerText;
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


function getAlibaba(items){
    const allProducts = [];
    items.forEach(item => {
        let newItem = {};
        newItem.image = item
          .querySelector(".offer-image-box")
          .childNodes[3].getAttribute("src");
        newItem.description = item.querySelector(
          ".title"
        ).childNodes[1].innerText;
        newItem.price = item
          .querySelector(".price")
          .childNodes[1].innerText.split("-")[0];
        newItem.quantity = 100;
        newItem.priceFormated = item
            .querySelector(".price")
            .childNodes[1].innerText.split("-")[0]
            .replace("$", "")
      });
}