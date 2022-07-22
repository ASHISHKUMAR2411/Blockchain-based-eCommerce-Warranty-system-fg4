var express = require("express");
var router = express.Router();

const {
  addNewAddress,
  getAddress,
  deleteAddress,
} = require("../controllers/address-controller");

router.post("/address/add-address", addNewAddress);
router.get("/address/get-addresses/:id", getAddress);
router.delete("/address/delete-address", deleteAddress);

module.exports = router;