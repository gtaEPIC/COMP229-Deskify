// Database setup
const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function(){

    mongoose.connect(process.env.ATLASDB);

    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error: '));
    mongodb.once('open', ()=>{
        console.log("====> Connected to MongoDB.");
    })

    return mongodb;
}