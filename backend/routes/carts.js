var express = require("express");
var router = express.Router();
const { addItems, removeItem ,removeAllItem, getCartItems} = require("../controllers/cart-controller");

router.post("/add-item",addItems)
router.delete("/remove-item", removeItem);
router.delete("/clear-cart", removeAllItem);
router.get("/get-items/:id", getCartItems);


module.exports = router;