const { Schema, model } = require("mongoose").mongoose;

const productSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  quantity: { type: Number, require: true },
  features: { type: Array, require: false }
});

module.exports = model("Product", productSchema);
