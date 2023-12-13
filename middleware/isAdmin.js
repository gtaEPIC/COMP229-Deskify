// middleware/isAdmin.js
const isAdmin = (req, res, next) => {
    if (req.user && req.user.type === 'admin') {
        next();
    } else {
        const error = new Error('Forbidden. Admin access required.');
        error.status = 403;
        next(error);
    }
};

module.exports = isAdmin;
