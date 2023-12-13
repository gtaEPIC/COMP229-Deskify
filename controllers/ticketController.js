const ticketModel = require('../models/ticket');
const {create, fetch} = require("./iterationController");
const User = require("../models/userResgistration");

// List all tickets
module.exports.list = async function (req, res, next) {
    try {
        // Populate the user field minus the password
        let list = await ticketModel.find({})
            .populate('user', '-password')
            .populate({
                path: 'iteration',
                populate: {
                    path: 'user',
                    select: '-password'
                }
            })
            .populate('resolution');
        res.json({ success: true, list: list });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

// Get a ticket by record
module.exports.getTicketByRecord = async function (req, res, next) {
    try {
        let ticket = await ticketModel.findOne({ record: req.params.id })
            .populate('user', '-password')
            .populate({
                path: 'iteration',
                populate: {
                    path: 'user',
                    select: '-password'
                }
            })
            .populate('resolution');
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
        let iteration = await create(req.auth.userId, "Created this ticket", ticketModel.TicketStatus.New);
        let ticket = await ticketModel.create({
            title: req.body.title,
            description: req.body.description,
            status: ticketModel.TicketStatus.New,
            priority: 1,
            record: ticketModel.FormatDateToRecord(new Date()) + '-' + await ticketModel.MakeRecordDigits(ticketModel),
            dateCreated: new Date(),
            updated: new Date(),
            // Get the user from the JWT
            user: req.auth.userId,
            iteration: [iteration._id],
            resolution: null
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
        const requestingUser = await User.findById(req.auth.userId);
        let ticket = await ticketModel.findOne({ record: req.params.id }).populate('user', '-password');
        if (!ticket)
            throw new Error('Ticket not found. Are you sure it exists?')

        if (requestingUser.username !== ticket.user.username && requestingUser.type !== 'admin') {
            res.status(403).json({ success: false, message: 'Unauthorized' });
            return;
        }

        // Determine what changed and add a comment
        let comment = "";
        if (ticket.title !== req.body.title) {
            comment += "Title changed from " + ticket.title + " to " + req.body.title + ". ";
        }
        if (ticket.description !== req.body.description) {
            comment += "Description changed from " + ticket.description + " to " + req.body.description + ". ";
        }
        if (ticket.status !== req.body.status) {
            if (requestingUser.type !== 'admin') {
                res.status(403).json({ success: false, message: 'Non-Admins can\'t change status.' });
                return;
            }
            comment += "Status changed from " + ticket.status + " to " + req.body.status + ". ";
        }
        if (ticket.priority !== req.body.priority) {
            if (requestingUser.type !== 'admin') {
                res.status(403).json({ success: false, message: 'Non-Admins can\'t change priority.' });
                return;
            }
            comment += "Priority changed from " + ticket.priority + " to " + req.body.priority + ". ";
        }
        if (comment === "") return res.json({ success: true, message: "No changes detected." });
        let iteration = await create(req.auth.userId, comment, req.body.status);
        let updatedTicket = {
            ...req.body,
            _id: ticket._id,
            record: ticket.record,
            dateCreated: ticket.dateCreated,
            updated: new Date(),
            iteration: [
                ...ticket.iteration,
                iteration._id
            ],
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
        const requestingUser = await User.findById(req.auth.userId);
        let ticket = await ticketModel.findOne({ record: req.params.id }).populate('user', '-password');
        if (!ticket)
            throw new Error('Ticket not found. Are you sure it exists?');

        if (requestingUser.username !== ticket.user.username && requestingUser.type !== 'admin') {
            res.status(403).json({ success: false, message: 'Unauthorized' });
            return;
        }

        let iteration = await create(req.auth.userId, "Ticket has been cancelled", ticketModel.TicketStatus.Cancelled);
        let updatedTicket = {
            ...ticket.toObject(),
            status: ticketModel.TicketStatus.Cancelled,
            updated: new Date(),
            iteration: [
                ...ticket.iteration,
                iteration._id
            ]
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

module.exports.resolve = async function (req, res, next) {
    try {
        const requestingUser = await User.findById(req.auth.userId);
        let ticket = await ticketModel.findOne({ record: req.params.id }).populate('user', '-password');
        if (!ticket)
            throw new Error('Ticket not found. Are you sure it exists?')

        if (requestingUser.username !== ticket.user.username && requestingUser.type !== 'admin') {
            res.status(403).json({ success: false, message: 'Unauthorized' });
            return;
        }

        let resolvedIteration = await fetch(req.params.resolution);
        if (!resolvedIteration)
            throw new Error('Resolution not found. Are you sure it exists?')
        let iteration = await create(req.auth.userId, "Ticket has been resolved", ticketModel.TicketStatus.Resolved);
        let updatedTicket = {
            ...ticket.toObject(),
            status: ticketModel.TicketStatus.Resolved,
            updated: new Date(),
            iteration: [
                ...ticket.iteration,
                iteration._id
            ],
            resolution: resolvedIteration._id
        };

        let result = await ticketModel.updateOne({ _id: ticket._id }, updatedTicket);

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "Ticket resolution set successfully."
            });
        } else {
            throw new Error('Ticket resolution not set. Are you sure it exists?');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

// Unresolve a ticket
module.exports.unresolve = async function (req, res, next) {
    try {
        const requestingUser = await User.findById(req.auth.userId);
        let ticket = await ticketModel.findOne({ record: req.params.id }).populate('user', '-password');
        if (!ticket)
            throw new Error('Ticket not found. Are you sure it exists?')

        if (requestingUser.username !== ticket.user.username && requestingUser.type !== 'admin') {
            res.status(403).json({ success: false, message: 'Unauthorized' });
            return;
        }

        let iteration = await create(req.auth.userId, "Ticket has been un-resolved", ticketModel.TicketStatus.New);
        let updatedTicket = {
            ...ticket.toObject(),
            status: ticketModel.TicketStatus.New,
            updated: new Date(),
            iteration: [
                ...ticket.iteration,
                iteration._id
            ],
            resolution: null
        };

        let result = await ticketModel.updateOne({ _id: ticket._id }, updatedTicket);

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "Ticket un-resolved successfully."
            });
        }else{
            throw new Error('Ticket un-resolved not set. Are you sure it exists?');
        }
    }catch (e) {
        console.error(e);
        next(e);
    }
}

module.exports.addComment = async function (req, res, next) {
    try {
        const requestingUser = await User.findById(req.auth.userId);
        let ticket = await ticketModel.findOne({record: req.params.id});
        if (!ticket)
            throw new Error('Ticket not found. Are you sure it exists?')

        if (!(ticket.status !== ticketModel.TicketStatus.New || ticket.status !== ticketModel.TicketStatus.InProgress) && requestingUser.type !== 'admin') {
            return res.status(403).json({success: false, message: 'Cannot add comment while ticket is closed'});
        }

        let iteration = await create(req.auth.userId, req.body.comment, ticket.status);
        let updatedTicket = {
            ...ticket.toObject(),
            updated: new Date(),
            iteration: [
                ...ticket.iteration,
                iteration._id
            ]
        };

        let result = await ticketModel.updateOne({_id: ticket._id}, updatedTicket);

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "Ticket comment added successfully."
            });
        }else{
            throw new Error('Ticket comment not added. Are you sure it exists?');
        }
    }catch (e) {
        console.error(e);
        next(e);
    }
}
