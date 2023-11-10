const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Ticket status "enum"
// TODO: Add other values for proper ticket workflow
const TicketStatus = {
    Open: 'Open',
    InProgress: 'In Progress',
    Closed: 'Closed',
    Cancelled: 'Cancelled'
}

const TicketSchema = new Schema({
    title: {type: String, required: true}, // Title of the ticket
    description: String, // Description of the ticket
    status: {type: String, default: 'Open', required: true}, // Status of the ticket
    priority: {type: Number, default: 1, required: true}, // Priority of the ticket
    record: {type: String, required: true, unique: true}, // Record of the ticket (Format to be "YYYYMMDD-<4 digit number>")
    dateCreated: {type: Date, default: Date.now, required: true}, // Date the ticket was created.
    //TODO: Finish adding User
    //user: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // User that created the ticket
    //TODO: Add iteration field
});
module.exports = mongoose.model('Ticket', TicketSchema);
module.exports.TicketStatus = TicketStatus;