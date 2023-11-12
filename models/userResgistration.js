// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    type: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
