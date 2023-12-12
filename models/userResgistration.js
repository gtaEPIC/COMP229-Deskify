// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    type: String,
    status: { type: String, default: 'active' },
    tickets: [
        {
            title: String,
            description: String,
            state: { type: String, default: 'open' } // Default state is 'open'
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
