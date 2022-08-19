const { ApiError } = require('./errorHandler');

module.exports = {
    checkAdmin (req, res, next) {
        if (!req.session.user) {
            throw new ApiError('You need to be logged', { statusCode: 401 });
        };

        if (req.session.user.role === "admin") {
            next();
        } else {
            throw new ApiError('Please contact an administrator to access to this function', { statusCode: 401 });
        };

    }
};
