var express = require("express");
var router = express.Router();
const { getProducts, addProducts} = require("../controllers/product-controller");

router.get("/get-products",getProducts);
router.post("/add-products", addProducts);

module.exports = router;