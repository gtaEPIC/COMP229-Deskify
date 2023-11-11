const mongoose = require("mongoose");
const Schema = mongoose.Schema

const registrationSchema = new Schema ({
    username: String,
    password: String,
    email: String,
    type: String,
});

module.exports = mongoose.model("userRegistration", registrationSchema);