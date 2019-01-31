var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth')
// const {googleCheck} = require('../middlewares/loginAuth')

/* GET home page. */
router.post('/login', authController.login)
router.post('/register', authController.register)

module.exports = router;
