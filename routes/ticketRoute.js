let express = require('express');
let router = express.Router();
const ticketController = require('../controllers/ticketController');


// Get all tickets
router.get('/', ticketController.list);

module.exports = router;