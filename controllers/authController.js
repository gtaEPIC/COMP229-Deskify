const User = require('../models/userResgistration');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {expressjwt} = require('express-jwt');

exports.user_login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
                { userId: user._id, username: user.username, isAdmin: user.type === 'admin' },
                process.env.JWT_SECRET || 'Default',
                { algorithm: 'HS512', expiresIn: '1h' }
            );

            res.json({ success: true, token: token });
        } else {
            res.status(401).json({ success: false, message: 'Authentication failed. Invalid username or password.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.user_logout = (req, res) => {
    // JWT is stateless, so this is mainly a client-side action
    res.json({ success: true, message: 'Logout successful. Please delete the token.' });
};

exports.modify_account = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);
        await User.findByIdAndUpdate(req.user.userId, { password: hashedPassword });
        res.json({ success: true, message: 'Account updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET || 'Default',
    algorithms: ['HS512'],
    userProperty: 'auth',
}).unless({ path: ['/public', '/login', '/signup'] });
