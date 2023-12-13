const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    type: String,
    status: { type: String, default: 'active' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
