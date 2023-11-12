var express = require('express');
var router = express.Router();
let ticketModel = require('../models/ticket');
let userModel = require('../models/userResgistration');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/tickets/:id', async function(req, res, next) {
    try {
        let ticket = await ticketModel.findOne({record: req.params.id});
        if (!ticket) throw new Error('Ticket not found. Are you sure it exists?')
        res.render('ticketView', {title: 'Ticket', ticket: ticket});
    }catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('/users/:username', async function(req, res, next) {
    try {
        let user = await userModel.findOne({user: req.params.username});
        if (!user) throw new Error('User not found. Are you sure it exists?')
        res.render('userView', {title: 'User', user: user});
    }catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('/tickets/:id/edit', async function(req, res, next) {
    try {
        let ticket = await ticketModel.findOne({record: req.params.id});
        if (!ticket) throw new Error('Ticket not found. Are you sure it exists?')
        res.render('ticketEdit', {title: 'Tickets', ticket: ticket});
    }catch (e) {
        console.error(e);
        next(e);
    }
});



module.exports = router;
