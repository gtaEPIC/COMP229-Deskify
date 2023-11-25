const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.user_login);
router.get('/logout', authController.user_logout);
router.put('/modify-account', authController.modify_account);

module.exports = router;
