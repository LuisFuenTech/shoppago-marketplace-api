const { Schema, model } = require("mongoose");
const { Category } = require("./index");

const productSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: String, require: true },
    priceFormated: { type: Number, require: true },
    quantity: { type: Number, require: true },
    //categories: [Category],
    image: { type: String, require: true }
  },
  {
    timestamps: true
  }
);

module.exports = model("Product", productSchema);
