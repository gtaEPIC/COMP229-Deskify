// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const isAdminMiddleware = require('../middleware/isAdmin');
const { adminDashboard } = require('../controllers/adminController');

router.get('/dashboard', isAdminMiddleware, adminDashboard);

module.exports = router;
