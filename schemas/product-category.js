const { Schema, model } = require("mongoose");

const prodCatSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true }
  },
  {
    timestamps: true
  }
);

module.exports = model("ProductCategory", prodCatSchema);
