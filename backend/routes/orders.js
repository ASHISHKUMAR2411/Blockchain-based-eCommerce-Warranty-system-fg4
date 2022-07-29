const express = require("express");
var router = express.Router();
const {
  completeOrder,
  getOrderDetails,
} = require("../controllers/order-controller");

router.post("/complete-order", completeOrder);
router.post("/get-order-details", getOrderDetails);

module.exports = router;