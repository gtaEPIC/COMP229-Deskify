const User = require('../models/userResgistration');
const {hashSync} = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.createUser = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;

        // Check if the username or email already exists
        const duplicate = await User.findOne({ $or: [{ username }, { email }] });
        if (duplicate) {
            return res.status(400).json({ success: false, message: 'Username or email already exists' });
        }

        const hashedPassword = hashSync(password, 10);

        let type = 'user';
        if (await User.countDocuments({ type: 'admin' }) === 0) {
            type = 'admin';
        }

        const newUser = new User({ username, password: hashedPassword, email, type });

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username },
            process.env.JWT_SECRET || 'Default',
            { algorithm: 'HS512', expiresIn: '1h' }
        );

        res.status(201).json({ success: true, message: 'User Created Successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            users: users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

module.exports.getUserByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username });

        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        res.status(200).json({ success: true, message: 'User retrieved successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports.updateUser = async (req, res, next) => {
    try {
        const { username } = req.params;
        const { password, email } = req.body;

        // Validate required fields
        if (!password || !email) {
            return res.status(400).json({ success: false, message: 'Password and email are required for update' });
        }

        const hashedPassword = hashSync(password, 10);
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { password: hashedPassword, email },
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports.deleteUser = async (req, res, next) => {
    try {
        const { username } = req.params;

        const deletedUser = await User.findOneAndDelete({ username });

        if (!deletedUser) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        res.status(200).json({ success: true, message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports.promoteToAdmin = async (req, res, next) => {
    try {
        const { username } = req.params;

        // Ensure the requesting user is an admin
        const requestingUser = await User.findById(req.auth.userId);
        if (!requestingUser || requestingUser.type !== 'admin') {
            res.status(403).json({ success: false, message: 'Unauthorized' });
            return;
        }

        const userToPromote = await User.findOneAndUpdate(
            { username },
            { type: 'admin' },
            { new: true }
        );

        if (!userToPromote) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        res.status(200).json({ success: true, message: 'User promoted to admin successfully', user: userToPromote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
