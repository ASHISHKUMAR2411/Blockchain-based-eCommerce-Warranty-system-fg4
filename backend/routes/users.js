var express = require('express');
var router = express.Router();
const {
  signin,
  login,
  logout,
  authentication,
  checkphone
} = require("../controllers/user-controller");

/* GET users listing. */
router.post('/signup', signin);
router.post("/login", login);
router.get("/logout", logout);
router.get("/authentication", authentication);
router.post("/check-phone", checkphone);



module.exports = router;
