var express = require("express");
var router = express.Router();
const { signin,login,logout} = require("../controllers/seller-controller");

router.post("/signup", signin);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;