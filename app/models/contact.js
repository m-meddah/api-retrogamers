const client = require('../config/db');

/**
 * @typedef {object} Contact
 * @property {number} id - Pk of the "contact" table
 * @property {string} firstname - firstname of the contact
 * @property {string} lastname - lastname of the contact
 * @property {string} email - email of the contact
 * @property {string} message - message of the contact
 * @property {string} file - file sent by the contact
 */

/**
 * @typedef {object} InputContact
 * @property {string} firstname - firstname of the contact user
 * @property {string} lastname - lastname of the contact user
 * @property {string} email - email of the contact user
 * @property {string} message - message of the contact user
 * @property {string} file - file of the contact user
 */

module.exports = {

    /**
     * Find all messages in our DB
     * @returns - All messages in our DB
     */
    async findAll() {
        const result = await client.query('SELECT * FROM "contact";');
        return result.rows;
    },

    /**
     * Find one message by id
     * @param {number} contactId - Id of the selected message
     * @returns - The selected message
     */
    async findByPk(contactId) {
        const result = await client.query('SELECT * FROM "contact" WHERE id = $1;', [contactId]);

        if (result.rowCount === 0) {
            return null;
        };

        return result.rows[0];
    },

    /**
     * Add a message into DB
     * @param {InputContact} message - message data to insert into DB
     * @returns new message
     */
    async create(contact) {
        
        const savedMessage = await client.query(
            `SELECT * FROM new_message ($1);`,
            [contact]
        )
        return savedMessage.rows[0];
    },

    async delete(id) {
        const result = await client.query('DELETE FROM "contact" WHERE id = $1', [id]);
        return !!result.rowCount;
    }

}