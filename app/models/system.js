const client = require('../config/db');

/**
 * @typedef {object} System
 * @property {number} id - Pk of the "system" table
 * @property {string} name - name of the system
 * @property {string} company - company of the system
 * @property {string} type - type of the system
 * @property {number} release_date - release date of the system
 * @property {number} end_date - end date of the system
 * @property {string} support_type - support type of the system
 * @property {string} media - media of the system
 * @property {string} big_media - media full size of the system
 * @property {string} video - video of the system
 * @property {string} logo - logo of the system
 */

module.exports = {

    /**
     * Find all systems in our DB
     * @returns - All systems in our DB
     */
    async findAll() {
        const result = await client.query('SELECT * FROM "system" ORDER BY name ASC;');
        return result.rows;
    },

    /**
     * Find one system by id
     * @param {number} systemId - Id of the selected system
     * @returns - The selected system
     */
    async findByPk(systemId) {
        const result = await client.query('SELECT * FROM "system" WHERE id = $1;', [systemId]);

        if (result.rowCount === 0) {
            return null
        };

        return result.rows[0];
    },

    /**
     * Find all games by system
     * @param {number} systemId - Id of the selected system
     * @returns - All the games from the selected system
     */
    async findAllGames(systemId) {
        const result = await client.query('SELECT * FROM "game" WHERE system_id = $1 ORDER BY title ASC;', [systemId]);

        return result.rows;
    },

    /**
     * Find all games details by system
     * @param {number} systemId - Id of the selected system
     * @return - All games' description from the selected system
     */
    async findAllDesc(systemId) {
        const result = await client.query('SELECT * FROM "desc" WHERE system_id = $1 ORDER BY title ASC;', [systemId]);

        return result.rows;
    }
};
