var express = require('express');
var router = express.Router();
const {signin, login} = require('../controllers/user-controller')

/* GET users listing. */
router.post('/signup', signin);
router.post("/login", login);


module.exports = router;
