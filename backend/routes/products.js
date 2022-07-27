var express = require("express");
var router = express.Router();
const {
  getProducts,
  addProducts,
  getProductById,
  getProductByCategory,
  getSellersProducts,
} = require("../controllers/product-controller");

router.get("/get-products-by-key/:key",getProducts);
router.post("/add-products", addProducts);
router.get("/get-product/:id", getProductById);
router.get("/get-products/:categoryName", getProductByCategory);
router.get("/get-products", getSellersProducts);

module.exports = router;