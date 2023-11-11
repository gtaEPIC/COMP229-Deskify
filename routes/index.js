var express = require('express');
var router = express.Router();

let indexController = require('../controllers');

router.get('/', indexController.home);
router.get('/userRegistration', indexController.userRegistration);
module.exports = router;
