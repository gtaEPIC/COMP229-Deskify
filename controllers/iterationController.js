const iterationModel = require('../models/ticketIteration');
const {Types} = require("mongoose");

module.exports.fetch = async function(id) {
    return iterationModel.findOne({_id: id}).populate('user', '-password');
}

module.exports.create = async function(userId, comment, newStatus) {
    return iterationModel.create({
        user: new Types.ObjectId(userId),
        dateCreated: new Date(),
        comment: comment,
        newStatus: newStatus
    });
}

// No others as iterations are only intended to be created