

module.exports.createUser = async (req, res, next) => {
    try {
        const {
            username,
            password,
            email,
            type
        } = req.body;

        const newUser = new User({
            username,
            password,
            email,
            type,
        });

        await newUser.save();

        res.status(201).json({message: 'User Created Successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}