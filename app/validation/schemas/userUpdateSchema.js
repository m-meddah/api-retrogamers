const Joi = require('joi');

module.exports = Joi.object({
    email: Joi.string()
        .pattern(/^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/),
    password: Joi.string(),
    firstname: Joi.string(),
    lastname: Joi.string(),
}).min(1).required();
