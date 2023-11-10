const ticketModel = require('../models/ticket');

module.exports.list = async function (req, res, next) {
    try {
        let list = await ticketModel.find({}); // .populate('User');
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
}