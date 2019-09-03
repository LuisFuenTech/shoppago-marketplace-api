const { Schema, model } = require("mongoose");

//document that store the information between product and category
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
