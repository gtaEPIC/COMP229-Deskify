var express = require('express');
var router = express.Router();
let ticketModel = require('../models/ticket');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/tickets/:id', async function(req, res, next) {
    let record = req.params.id;
    let ticket = await ticketModel.findOne({ record: req.params.id });
    if (!ticket) throw new Error('Ticket not found. Are you sure it exists?')
    res.render('ticketView', { title: 'Ticket', ticket: ticket });
});
let indexController = require('../controllers');

router.get('/', indexController.home);
router.get('/userRegistration', indexController.userRegistration);
module.exports = router;
