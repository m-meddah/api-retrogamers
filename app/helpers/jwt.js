/*
FOR V2

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = {
    create(userData) {
        const options = {};
        options.expiresIn = process.env.JWT_EXPIRES;

        const user = {
            id: userData.id,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            ip: userData.ip
        };

        const token = jwt.sign(user, secret, options)

        return token
    }
}
*/