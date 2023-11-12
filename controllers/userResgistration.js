const User = require('../models/userResgistration'); 

module.exports.createUser = async (req, res, next) => {
    try {
        const { username, password, email, type } = req.body;

        
        const newUser = new User({ username, password, email, type });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User Created Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            users: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

module.exports.userByusername = async (req, res, next) => {
    try {
        const { username } = req.params; // Assuming username is part of the route parameters

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

module.exports.update = async (req, res, next) => {
    try {
        const { username } = req.params; // Assuming username is part of the route parameters
        const { password, email, type } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { username },
            { password, email, type },
            { new: true } // Return the updated document
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
        const { username } = req.params; // Assuming username is part of the route parameters

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



