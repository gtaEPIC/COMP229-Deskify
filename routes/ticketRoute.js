let express = require('express');
let router = express.Router();
const ticketController = require('../controllers/ticketController');
const {requireSignin} = require("../controllers/authController");


// Get all tickets
router.get('/', ticketController.list);
// Get a ticket by record
router.get('/:id', ticketController.getTicketByRecord);
// Create a ticket
router.post('/', requireSignin, ticketController.createTicket);
// Update a ticket
router.put('/:id', requireSignin, ticketController.updateTicket);
// Disable a ticket
router.delete('/:id', requireSignin, ticketController.disableTicket);

module.exports = router;