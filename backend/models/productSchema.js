var mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    shortTitle: String,
    longTitle: String,
  },
  price: {
    mrp: Number,
    cost: Number,
    discount: Number,
  },
  qty: Number,
  category: String,
  discount: String,
  tagline: String,
  sellerId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  // url: String,
  // detailurl:String,
});

const Product = new mongoose.model("product",productSchema);
module.exports = Product;