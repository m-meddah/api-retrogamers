const gameDatamapper = require('../models/game');
const { ApiError } = require('../helpers/errorHandler');

module.exports = {

    /**
     * Game controller to get all records
     * @param {*} _ Express req.object
     * @param {*} res Express res.object
     * @returns Route API JSON response
     */
    async getAll(_, res) {
        const games = await gameDatamapper.findAll();

        if (games.length === 0) {
            throw new ApiError("0 game's description in our DB", { statusCode: 404 });
        };

        return res.json(games)
    },

    /**
     * Game controller to get one record
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getOne(req, res) {
        const game = await gameDatamapper.findOne(req.params.id);

        if (!game) {
            throw new ApiError('Game not found', { statusCode: 404 });
        };

        return res.json(game);
    }
};
