const ticketModel = require('../models/ticket');

// TODO: Add proper authentication to all routes

// List all tickets
module.exports.list = async function (req, res, next) {
    try {
        let list = await ticketModel.find({}); // .populate('User');
        res.json({ success: true, list: list });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

// Get a ticket by record
module.exports.getTicketByRecord = async function (req, res, next) {
    try {
        let ticket = await ticketModel.findOne({ record: req.params.id });
        if (!ticket)
            throw new Error('Ticket not found. Are you sure it exists?')

        res.json({ success: true, ticket: ticket });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

// Create a ticket
module.exports.createTicket = async function (req, res, next) {
    try {
        let ticket = await ticketModel.create({
            title: req.body.title,
            description: req.body.description,
            status: ticketModel.TicketStatus.Open,
            priority: 1,
            record: ticketModel.FormatDateToRecord(new Date()) + '-' + await ticketModel.MakeRecordDigits(ticketModel),
            dateCreated: new Date(),
            updated: new Date(),
            iteration: [{
                dateCreated: new Date(),
                comment: "Created this ticket",
                newStatus: ticketModel.TicketStatus.Open,
            }],
            resolution: req.body.resolution
        });
        res.json({ success: true, ticket: ticket });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

// Update a ticket
module.exports.updateTicket = async function (req, res, next) {
    try {
        let ticket = await ticketModel.findOne({ record: req.params.id });
        if (!ticket)
            throw new Error('Ticket not found. Are you sure it exists?')

        let updatedTicket = {
            ...req.body,
            _id: ticket._id,
            record: ticket.record,
            dateCreated: ticket.dateCreated,
            updated: new Date(),
        };

        let result = await ticketModel.updateOne({ _id: ticket._id }, updatedTicket);

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "Ticket updated successfully."
            });
        } else {
            throw new Error('Ticket not updated. Are you sure it exists?');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

// Disable a ticket
module.exports.disableTicket = async function (req, res, next) {
    try {
        let ticket = await ticketModel.findOne({ record: req.params.id });
        if (!ticket)
            throw new Error('Ticket not found. Are you sure it exists?')

        let updatedTicket = {
            ...ticket.toObject(),
            status: ticketModel.TicketStatus.Cancelled,
            updated: new Date(),
        };

        let result = await ticketModel.updateOne({ _id: ticket._id }, updatedTicket);

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "Ticket disabled successfully."
            });
        } else {
            throw new Error('Ticket not disabled. Are you sure it exists?');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}
