const { Schema, model } = require("mongoose");

//Model for product
const productSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: String, require: true },
    priceFormated: { type: Number, require: true },
    quantity: { type: Number, require: true },
    image: { type: String, require: false }
  },
  {
    timestamps: true
  }
);

module.exports = model("Product", productSchema);
