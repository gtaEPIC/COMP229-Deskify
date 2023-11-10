let express = require('express');
let router = express.Router();
const ticketController = require('../controllers/ticketController');


// Get all tickets
router.get('/', ticketController.list);
// Get a ticket by record
router.get('/:id', ticketController.getTicketByRecord);
// Create a ticket
router.post('/', ticketController.createTicket);
// Update a ticket
router.put('/:id', ticketController.updateTicket);
// Disable a ticket
router.delete('/:id', ticketController.disableTicket);

module.exports = router;