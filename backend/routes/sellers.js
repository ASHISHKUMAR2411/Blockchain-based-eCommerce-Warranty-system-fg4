var express = require("express");
var router = express.Router();
const {
  signin,
  login,
  logout,
  authentication,
} = require("../controllers/seller-controller");

router.post("/signup", signin);
router.post("/login", login);
router.get("/logout", logout);
router.get("/authentication", authentication);

module.exports = router;