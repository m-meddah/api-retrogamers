const debug = require('debug')('Validator:log');
const { ApiError } = require('../helpers/errorHandler');

/**
 * Validation middleware
 * @param {string} prop - Property's name for the validation of the request object
 * @param {Joi.object} schema - Validation schema from Joi module
 * @returns Returns a middleware for Express to validate the request body
 */
module.exports = (prop, schema) => async (request, _, next) => {
    try {
        debug(request[prop]);
        await schema.validateAsync(request[prop]);
        next();
    } catch (error) {
        next(new ApiError(error.details[0].message, { statusCode: 400 }));
    }
};
