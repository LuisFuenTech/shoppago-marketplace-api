const { Schema, model } = require("mongoose");

//Model for shopping cart
const shoppingSchema = new Schema(
  {
    products: [{ type: Schema.Types.ObjectId, ref: "ProductCategory" }]
  },
  {
    timestamps: true
  }
);

module.exports = model("Shopping", shoppingSchema);
