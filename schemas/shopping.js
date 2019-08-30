const { Schema, model } = require("mongoose");
const { ProdCatSchema } = require("./index");

const shoppingSchema = new Schema(
  {
    products: [ProdCatSchema]
  },
  {
    timestamps: true
  }
);

module.exports = model("Shopping", shoppingSchema);
