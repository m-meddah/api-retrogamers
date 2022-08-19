const bcrypt = require('bcrypt');

function encrypt (password) {
    return bcrypt.hashSync(password, 10);
};

module.exports = encrypt;