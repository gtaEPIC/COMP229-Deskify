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
    record: {type: String, required: true, unique: true}, // Record of the ticket (Format to be "YYYYMMDD-XXXX")
    dateCreated: {type: Date, default: Date.now, required: true}, // Date the ticket was created.
    updated: {type: Date, default: Date.now, required: true}, // Date the ticket was last updated.
    //TODO: Finish adding User
    //user: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // User that created the ticket
    //Iteration object
    iteration: {
        //username: {type: String, required: true}, // Username of the person who regitered the change
        dateCreated: {type: Date, default: Date.now, required: true}, // Date the iteration was made
        comment: {type: String, required: true} // Iteration comment from the user
    },
});

TicketSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.id;
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);
module.exports.TicketStatus = TicketStatus;
module.exports.FormatDateToRecord = function(date) {
    return date.getFullYear() +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        ('0' + date.getDate()).slice(-2);
}
module.exports.MakeRecordDigits = function(ticketModel) {
    return ticketModel.countDocuments().then(function (count) {
        return ('000' + (count + 1)).slice(-4);
    });
}