var express = require("express");
var router = express.Router();
const {
  getProducts,
  addProducts,
  getProductById,
  getProductByCategory,
} = require("../controllers/product-controller");

router.get("/get-products",getProducts);
router.post("/add-products", addProducts);
router.get("/get-product/:id", getProductById);
router.get("/get-products/:categoryName", getProductByCategory);

module.exports = router;