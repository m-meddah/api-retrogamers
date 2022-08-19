const client = require('../config/db');

/**
 * @typedef {object} User
 * @property {number} id - Pk of the "user" table
 * @property {string} email - email of the user
 * @property {string} password - hashed password of the user
 * @property {string} firstname - firstname of the user
 * @property {string} lastname - lastname of the user
 * @property {string} profile_picture - profile picture of the user
 * @property {string} role - role of the user, default 'user'
 */

/**
 * @typedef {object} InputUser
 * @property {string} email - email of the user
 * @property {string} password - password of the user
 * @property {string} firstname - firstname of the user
 * @property {string} lastname - lastname of the user
 * @property {string} profile_picture - profile picture of the user
 */

/**
 * @typedef {object} InputLogin
 * @property {string} email - email of the user
 * @property {string} password - password of the user
 */

module.exports = {

    /**
     * Find all users in our DB
     * @returns - All users in our DB
     */
     async findAll() {
        const result = await client.query('SELECT * FROM "user";');
        return result.rows;
    },

    /**
     * Find one user by id
     * @param {number} userId - Id of the selected user
     * @returns - The selected user
     */
     async findByPk(userId) {
        const result = await client.query('SELECT * FROM "user" WHERE id = $1;', [userId]);

        if (result.rowCount === 0) {
            return null
        };

        return result.rows[0];
    },

    /**
     * Add an unique user into DB
     * @param {InputUser} user - user data to insert into DB
     * @returns new user
     */
    async create(user) {
        const savedUser = await client.query(
            `SELECT * FROM new_user ($1);`,
            [user]
        );
        return savedUser.rows[0];
    },

    /**
     * Modify user into DB
     * @param {number} id - Id of the user
     * @param {InputUser} user - Data to modify
     * @returns User has been modify
     */
     async update(id, user) {
        const fields = Object.keys(user).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(user);

        const savedUser = await client.query(
            `
                UPDATE "user" SET
                    ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
            [...values, id],
        );

        return savedUser.rows[0];
    },

    async delete(id) {
        const result = await client.query(
            `DELETE FROM "collection" WHERE user_id = ${id};
            DELETE FROM "user" WHERE id = ${id};`);

        return !!result.rowCount;
    },

    async isUnique(inputData) {
        const fields = [];
        const values = [];

        Object.entries(inputData).forEach(([key, value], index) => {
            if (['email'].includes(key)) {
                fields.push(`"${key}" = $${index + 1}`);
                values.push(value);
            }
        });

        const query = {
            text: `SELECT * FROM "user" WHERE ${fields};`,
            values,
        };

        const result = await client.query(query);

        if (result.rowCount === 0) {
            return null;
        };

        return result.rows[0];
    },

    async findByEmail(inputData) {
        const result = await client.query(`SELECT * FROM "user" WHERE "email" = '${inputData}';`);

        if (result.rowCount === 0) {
            return null;
        };

        return result.rows[0];
    },

}
