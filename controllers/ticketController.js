const ticketModel = require('../models/ticket');

// TODO: Add proper authentication to all routes

// List all tickets
module.exports.list = async function (req, res, next) {
    try {
        let list = await ticketModel.find({}); // .populate('User');
        res.json({ success: true, list: list });
    } catch (error) {
        console.log(error);
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
        console.log(error);
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
            //user: req.body.user,
            iteration: [{
                //username: req.body.user,
                dateCreated: new Date(),
                comment: "Created this ticket",
                newStatus: ticketModel.TicketStatus.Open // Mark it as now opened
            }]

            },
        });
        res.json({ success: true, ticket: ticket });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Update a ticket
module.exports.updateTicket = async function (req, res, next) {
    try {
        let ticket = await ticketModel.findOne({ record: req.params.id });
        if (!ticket)
            throw new Error('Ticket not found. Are you sure it exists?')

        let updatedTicket = ticketModel(req.body);
        updatedTicket._id = ticket._id;
        updatedTicket.record = ticket.record;
        updatedTicket.dateCreated = ticket.dateCreated;
        updatedTicket.updated = new Date();
        //Iteration
        // If a comment is only being added, all the information will be kept the same
        // But an iteration will still be created
        iteration: [
            ... ticket.iteration,
            { // Create a new iteration
                //username: req.body.user,
                dateCreated: new Date(),
                comment: req.body.comment,
                newStatus: req.body.status // If the status is changed it will reflect here
            }
        ]

        let result = await ticketModel.updateOne({ _id: ticket._id }, updatedTicket);
        console.log(result);
        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "Ticket updated successfully."
                }
            );
        }
        else {
            // Express will catch this on its own.
            throw new Error('Ticket not updated. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// Disable a ticket
module.exports.disableTicket = async function (req, res, next) {
    try {
        let ticket = await ticketModel.findOne({ record: req.params.id });
        if (!ticket) throw new Error('Ticket not found. Are you sure it exists?')

        // TODO: Create an iteration
        let updatedTicket = ticketModel({
            _id: ticket._id,
            title: ticket.title,
            description: ticket.description,
            status: ticketModel.TicketStatus.Cancelled,
            priority: ticket.priority,
            record: ticket.record,
            dateCreated: ticket.dateCreated,
            updated: ticket.updated,
            //user: ticket.user,
            //Iteration
            // iterationUser: ticket.iteration.user,
            iterationDateCreated: ticket.iteration.dateCreated,
            iterationComment: ticket.iteration.comment,

        });
        let result = await ticketModel.updateOne({ _id: ticket._id }, updatedTicket);
        console.log(result);

        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "Ticket disabled successfully."
                }
            );
        }
        else {
            // Express will catch this on its own.
            throw new Error('Ticket not disabled. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}