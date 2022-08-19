const client = require('../config/db');

/**
 * @typedef {object} Collection
 * @property {number} id - Pk of the "collection" table
 * @property {string} label - label of the collection
 */

/**
 * @typedef {object} CollectionDetails
 * @property {number} id - id of the collection
 * @property {string} name - name of the system
 * @property {string} title - title of the game
 */

/**
 * @typedef {object} InputCollectionSystem
 * @property {number} collection_id - id of the collection
 * @property {number} system_id - Id of the system
 */

/**
 * @typedef {object} InputCollectionGame
 * @property {number} id - id of the collection
 * @property {number} game - id of the game
 */

module.exports = {

    /**
     * Find all collections in our DB
     * @returns - All collections in our DB
     */
     async findAll() {
        const result = await client.query('SELECT * FROM "collection";');
        return result.rows;
    },

    /**
     * Find one collection by id
     * @param {number} collectionId - Id of the selected collection
     * @returns - The selected collection
     */
    async findByPk(collectionId) {
        const result = await client.query('SELECT * FROM "collection" WHERE id = $1;', [collectionId]);

        if (result.rowCount === 0) {
            return null;
        };

        return result.rows[0];
    },

    /**
     * Find the detail of the selected collection
     * @param {number} collectionId 
     * @returns - The detail of the collection
     */
    async findByPkDetails(collectionId) {
        const result = await client.query(`SELECT "collection".*, "collection_has_system_and_game".*, "system".*, "game"."system_id", "desc".* FROM "desc"
        JOIN "game" ON "game"."id" = "desc"."id"
        JOIN "collection_has_system_and_game" ON "game"."id" = "collection_has_system_and_game"."game_id"
        JOIN "system" ON "game"."system_id" = "system"."id"
        JOIN "collection" ON "collection"."id" = "collection_has_system_and_game"."collection_id"
        WHERE "collection"."id" = ${collectionId};`);

        return result.rows;
    },

    /**
     * Find collection by user id
     * @param {number} userId - Id of the selected user
     * @returns - The collection of the selected user
     */
    async findByUserId(userId) {
        const result = await client.query(`SELECT * FROM "collection" WHERE "user_id" = '${userId}';`);

        if (result.rowCount === 0) {
            return null;
        };

        return result.rows[0];
    },

    /**
     * Find systems in collection by collection id
     * @param {number} collectionId - Id of the selected collection
     * @returns - The systems into collection of the selected collection
     */
    async findSystemsByCollection(collectionId) {
        const result = await client.query(
            `SELECT "collection".*, "system".* FROM "system"
            JOIN "collection_has_system_and_game" ON "system"."id" = "collection_has_system_and_game"."system_id"
            JOIN "collection" ON "collection"."id" = "collection_has_system_and_game"."collection_id"
            WHERE "collection"."id" = ${collectionId}
            ORDER BY "system"."name";`);

        if (result.rowCount === 0) {
            return null;
        };

        return result.rows;
    },

    /**
     * Find systems in collection by user id
     * @param {number} userId - Id of the selected user
     * @returns - The systems into collection of the selected user
     */
    async findSystemsByUserId(userId) {
        const result = await client.query(
            `SELECT "system".* FROM "system"
            JOIN "collection_has_system_and_game" ON
            "collection_has_system_and_game"."system_id" = "system".id
            JOIN "collection" ON "collection"."id" = "collection_has_system_and_game"."collection_id"
            JOIN "user" ON "user"."id" = "collection"."user_id"
            WHERE "user"."id" = ${userId};`);

        if (result.rowCount === 0) {
            return null;
        };

        return result.rows;
    },

    /**
     * Find games in collection by collection id
     * @param {number} collectionId - Id of the selected collection
     * @returns - The games into collection of the selected collection
     */
    async findGamesByCollection(collectionId) {
        const result = await client.query(
            `SELECT "collection".*, "desc".*, "system"."name" FROM "desc"
            JOIN "game" ON "game"."id" = "desc"."id"
            JOIN "collection_has_system_and_game" ON "game"."id" = "collection_has_system_and_game"."game_id"
            JOIN "collection" ON "collection"."id" = "collection_has_system_and_game"."collection_id"
            JOIN "system" ON "desc"."system_id" = "system"."id"
            WHERE "collection"."id" = ${collectionId}
            ORDER BY "system"."name", "desc"."title";`);

        if (result.rowCount === 0) {
            return null;
        };

        return result.rows;

    },

    /**
     * Find games in collection by user id
     * @param {number} userId - Id of the selected user
     * @returns - The games into collection of the selected user
     */
    async findGamesByUserId(userId) {
        const result = await client.query(
            `SELECT "user".*, "desc".* FROM "desc"
            JOIN "game" ON "game"."id" = "desc"."id"
            JOIN "collection_has_system_and_game" ON "game"."id" = "collection_has_system_and_game"."game_id"
            JOIN "collection" ON "collection"."id" = "collection_has_system_and_game"."collection_id"
            JOIN "user" ON "user"."id" = "collection"."user_id"
            WHERE "user"."id" = ${userId};`);

        if (result.rowCount === 0) {
            return null;
        };

        return result.rows;
    },

    /**
     * Create a collection by user id
     * @param {number} userId - Id of the selected user
     * @returns - a new collection
     */
    async create(userId) {
        const query = {
            text: `INSERT INTO "collection" ("user_id", "label") VALUES ($1, $2);`,
            values: [
                userId,
                "Ma collection"
            ]
        };

        const result = await client.query(query);

        return result.rows[0];

    },

    async isUniqueSystem(inputData) {
        const fields = [];
        const values = [];

        Object.entries(inputData).forEach(([key, value], index) => {
            if (['system_id', 'collection_id'].includes(key)) {
                fields.push(`"${key}" = $${index + 1}`);
                values.push(value);
            }
        });

        const query = {
            text: `SELECT * FROM "collection_has_system_and_game" WHERE (${fields.join(' AND ')})`,
            values
        }

        const result = await client.query(query)

        if (result.rowCount === 0) {
            return null
        }

        return result.rows[0];
    },

    async addSystemByCollection(system) {
        const savedSystem = await client.query(`SELECT * FROM new_system ($1)`, [system]);
        return savedSystem.rows[0]
    },

    async isUniqueGame(inputData) {
        const fields = [];
        const values = [];

        Object.entries(inputData).forEach(([key, value], index) => {
            if (['game_id', 'collection_id'].includes(key)) {
                fields.push(`"${key}" = $${index + 1}`);
                values.push(value);
            }
        });

        const query = {
            text: `SELECT * FROM "collection_has_system_and_game" WHERE (${fields.join(' AND ')})`,
            values
        }

        const result = await client.query(query)

        if (result.rowCount === 0) {
            return null
        }

        return result.rows[0];
    },

    /**
     * Add a game into a selected collection
     * @param {number} collectionId - Id of the selected collection
     * @param {number} gameId - Id of the selected game
     * @returns a new game into a selected collection
     */
    async addGameByCollection(game) {

        const savedGame = await client.query(`SELECT * FROM new_game ($1)`, [game]);
        return savedGame.rows[0]

    },

    async delete(id) {
        const result = await client.query(
            `DELETE FROM "collection_has_system_and_game" WHERE "collection_id" = ${id};
            DELETE FROM "collection" WHERE id = ${id};`);
        return !!result.rowCount;
    },

    /**
     * Remove a system from the selected collection
     * @param {number} collectionId - Id of the selected collection
     * @param {number} systemId - Id of the selected system
     * @returns 
     */
    async removeSystem(systemId, collectionId) {
        const query = {
            text: `DELETE FROM "collection_has_system_and_game" WHERE "system_id" = $1 AND "collection_id" = $2;`,
            values: [
                systemId,
                collectionId
            ]
        };

        const result = await client.query(query);

        return result.rows[0];

    },

    /**
     * Remove a game from the selected collection
     * @param {number} collectionId - Id of the selected collection
     * @param {number} gameId - Id of the selected game
     * @returns 
     */
    async removeGame(gameId, collectionId) {
        const query = {
            text: `DELETE FROM "collection_has_system_and_game" WHERE "game_id" = $1 AND "collection_id" = $2;`,
            values: [
                gameId,
                collectionId
            ]
        };

        const result = await client.query(query);

        return result.rows[0];

    },

};
