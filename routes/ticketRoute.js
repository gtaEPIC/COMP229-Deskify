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
// Set a resolution
router.put('/:id/resolve/:resolution', requireSignin, ticketController.resolve);
// Unset a resolution
router.put('/:id/unresolve', requireSignin, ticketController.unresolve);
// Add a comment / iteration
router.post('/:id/comment', requireSignin, ticketController.addComment);


module.exports = router;