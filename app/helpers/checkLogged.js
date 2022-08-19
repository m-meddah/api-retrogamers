const { ApiError } = require('../helpers/errorHandler');

module.exports = {
    checkLogged(req, res, next) {
        if (!req.session.user) {
            throw new ApiError('You need to be logged', { statusCode: 401 });
        } else {
            next();
        }
    }
}