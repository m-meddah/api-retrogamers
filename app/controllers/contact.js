const contactDataMapper = require('../models/contact');
const { ApiError } = require('../helpers/errorHandler');

module.exports = {

    /**
     * Contact controller to get all records
     * @param {object} _ Express req.object (not used)
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getAll(_, res) {
        const contacts = await contactDataMapper.findAll();

        if (contacts.length === 0) {
            throw new ApiError('0 message in our DB', { statusCode: 404 });
        }
        return res.json(contacts);
    },

    /**
     * Contact controller to get one record
     * @param {object} res Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getOne(req, res) {
        const contact = await contactDataMapper.findByPk(req.params.id);

        if (!contact) {
            throw new ApiError('Message not found', { statusCode: 404 });
        };

        return res.json(contact);
    },

    /**
     * Contact controller to create a record
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async create(req, res) {

        const newMessage = await contactDataMapper.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            message: req.body.message,
            file: req.body.file
    });

        return res.json(newMessage)
    },

    async delete(req, res) {
        const contact = await contactDataMapper.findByPk(req.params.id);
        if (!contact) {
            throw new ApiError('This message does not exist', { statusCode: 404 });
        };

        await contactDataMapper.delete(req.params.id);
        return res.status(204).json();
    }
}