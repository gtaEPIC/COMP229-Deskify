const User = require('../models/userResgistration'); // Correct the path to the user model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');

exports.user_login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
                { userId: user._id, username: user.username, isAdmin: user.isAdmin },
                process.env.JWT_SECRET || 'Default',
                { algorithm: 'HS512', expiresIn: '1h' }
            );
            res.json({ success: true, token: token });
        } else {
            res.status(401).send('Authentication failed');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.user_logout = (req, res) => {
    // JWT is stateless, so this is mainly a client-side action
    res.json({ success: true, message: 'Logout successful. Please delete the token.' });
};

exports.modify_account = async (req, res) => {
    // Example of updating user's password
    try {
        const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);
        await User.findByIdAndUpdate(req.user.userId, { password: hashedPassword });
        res.send('Account updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET || 'Default',
    algorithms: ['HS512'],
    userProperty: 'auth',
});
