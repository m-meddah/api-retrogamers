const collectionDataMapper = require('../models/collection');
const { ApiError } = require('../helpers/errorHandler');

module.exports = {

    /**
     * Collection controller to get all records
     * @param {object} _ Express req.object (not used)
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getAll(_, res) {
        const collections = await collectionDataMapper.findAll();

        if (collections.length === 0) {
            throw new ApiError('0 collection in our DB', { statusCode: 404 });
        };

        return res.json(collections);
    },


    /**
     * Collection controller to get all records of the user
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getAllByUserId(req, res) {
        const collectionsByUser = await collectionDataMapper.findByUserId(req.params.id);

        if (collectionsByUser === null) {
            throw new ApiError('User not found', { statusCode: 404 });
        };

        if (!collectionsByUser) {
            throw new ApiError('This user has no collection in our DB', { statusCode: 404 });
        };

        return res.json(collectionsByUser);
    },

    /**
     * Collection controller to get one record
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getOne(req, res) {
        const collection = await collectionDataMapper.findByPk(req.params.id);

        if (!collection) {
            throw new ApiError('Collection not found', { statusCode: 404 });
        };

        return res.json(collection);
    },

    /**
     * Collection controller to get one record in detail
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getOneDetails(req, res) {
        const collection = await collectionDataMapper.findByPkDetails(req.params.id);

        if (collection.length === 0) {
            throw new ApiError('Collection not found', { statusCode: 404 });
        }

        if (!collection) {
            throw new ApiError('Collection not found', { statusCode: 404 });
        };

        return res.json(collection);
    },

    /**
     * Collection controller to get all systems
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getAllSystems(req, res) {
        const systems = await collectionDataMapper.findSystemsByCollection(req.params.id);

        if (systems === null) {
            throw new ApiError('Collection not found', { statusCode: 404 });
        };

        if (!systems) {
            throw new ApiError('That collection has 0 system found', { statusCode: 404 });
        };

        return res.json(systems);
    },

    /**
     * Collection controller to get all systems by user
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getSystemsByUser(req, res) {
        const systems = await collectionDataMapper.findSystemsByUserId(req.params.id);

        if (systems === null) {
            throw new ApiError('Collection not found', { statusCode: 404 });
        };

        if (!systems) {
            throw new ApiError('That collection has 0 system found', { statusCode: 404 });
        };

        return res.json(systems);
    },

    /**
     * Collection controller to get all games
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getAllGames(req, res) {
        const games = await collectionDataMapper.findGamesByCollection(req.params.id);

        if (games === null) {
            throw new ApiError('Collection not found', { statusCode: 404 });
        };

        if (!games) {
            throw new ApiError('That collection has 0 game found', { statusCode: 404 });
        };

        return res.json(games);
    },

    /**
     * Collection controller to get all games by user
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getGamesByUser(req, res) {
        const games = await collectionDataMapper.findGamesByUserId(req.params.id);

        if (games === null) {
            throw new ApiError('Collection not found', { statusCode: 404 });
        };

        if (!games) {
            throw new ApiError('That collection has 0 game found', { statusCode: 404 });
        };

        return res.json(games);
    },

    /**
     * Collection controller to add a system.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async addSystem(req, res) {

        const uniqueSystem = await collectionDataMapper.isUniqueSystem(req.body)

        if (uniqueSystem) {
            if (uniqueSystem.system_id === req.body.system_id || uniqueSystem.collection_id === req.body.collection_id) {
                throw new ApiError('This system already exist in that collection', { statusCode: 404 })
            }
        }

        const system = await collectionDataMapper.addSystemByCollection({
            system_id : req.body.system_id,
            collection_id : req.body.collection_id,
        });

        return res.json(system);
        
    },

    /**
     * Collection controller to add a game.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
     async addGame(req, res) {

        const uniqueGame = await collectionDataMapper.isUniqueGame(req.body)

        if (uniqueGame) {
            if (uniqueGame.game_id === req.body.game_id || uniqueGame.collection_id === req.body.collection_id) {
                throw new ApiError('This game already exist in that collection', { statusCode: 404 })
            }
        }

        const game = await collectionDataMapper.addGameByCollection({
            game_id : req.body.game_id,
            collection_id : req.body.collection_id,
        });

        return res.json(game);
        
    },

    /**
     * Collection controller to delete a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async delete(req, res) {
        const collection = await collectionDataMapper.findByPk(req.params.id);
        if (!collection) {
            throw new ApiError('This collection does not exist', { statusCode: 404 });
        }

        await collectionDataMapper.delete(req.params.id);

        return res.status(204).json();
    },

    /**
     * Collection controller to delete a system.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async removeSystem(req, res) {
        const system = await collectionDataMapper.removeSystem(req.body.system_id, req.body.collection_id);

        return res.status(204).json();
    },

    /**
     * Collection controller to delete a game.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async removeGame(req, res) {
        const game = await collectionDataMapper.removeGame(req.body.game_id, req.body.collection_id);

        return res.status(204).json();
    }

}