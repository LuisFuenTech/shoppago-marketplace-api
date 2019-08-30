const { Schema, model } = require("mongoose");

const shoppingSchema = new Schema(
  {
    products: [{ type: Schema.Types.ObjectId, ref: "ProductCategory" }]
  },
  {
    timestamps: true
  }
);

module.exports = model("Shopping", shoppingSchema);
