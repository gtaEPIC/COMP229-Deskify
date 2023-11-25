// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    // Add other user fields as needed
});

module.exports = mongoose.model('User', UserSchema);
