const userDataMapper = require('../models/user');
const collectionDataMapper = require('../models/collection');
const encrypt = require('../helpers/encrypt');
const bcrypt = require('bcrypt');
// const jwt = require('../helpers/jwt')
const { ApiError } = require('../helpers/errorHandler');



module.exports = {

    /**
     * User controller to get all records
     * @param {object} _ Express req.object (not used)
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getAll(_, res) {
        const users = await userDataMapper.findAll();

        if (users.length === 0) {
            throw new ApiError('0 user in our DB', { statusCode: 400 })
        };

        return res.json(users)
    },

    /**
     * User controller to get all records
     * @param {object} _ Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async getOne(req, res) {
        const user = await userDataMapper.findByPk(req.params.id);

        if (!user) {
            throw new ApiError('User not found', { statusCode: 404 });
        };

        return res.json(user);
    },

    /**
     * User controller to create a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
    async create(req, res) {

        const user = await userDataMapper.isUnique(req.body);

        if (user) {
            let field;
            if (user.email === req.body.email) {
                field = 'email';
            };

            throw new ApiError(`User already exists with this ${field}`, { statusCode: 400});
        };

        if (req.body.password.length < 8) {
            throw new ApiError('Mot de passe trop court', { statusCode: 400 });
        }

        const newUser = await userDataMapper.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: encrypt(req.body.password)
        });

        collectionDataMapper.create(newUser.id)

        req.session.user = {
            login: newUser.login
        }

        return res.json(newUser);
    },

    /**
     * User controller to update a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
     async update(req, res) {
        const user = await userDataMapper.findByPk(req.params.id);
        if (!user) {
            throw new ApiError('This user does not exist', { statusCode: 404 });
        }

        if (req.body.email) {
            const existingUser = await userDataMapper.isUnique(req.body, req.params.id);
            if (existingUser) {
                let field;
                if (existingUser.email === req.body.email) {
                    field = 'email';
                }
                throw new ApiError(`Other user already exists with this ${field}`, {
                    statusCode: 400,
                });
            }
        }

        const savedUser = await userDataMapper.update(req.params.id, req.body);
        return res.json(savedUser);
    },

    /**
     * User controller to delete a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express res.object
     * @returns Route API JSON response
     */
     async delete(req, res) {
        const user = await userDataMapper.findByPk(req.params.id);
        if (!user) {
            throw new ApiError('This user does not exist', { statusCode: 404 });
        }

        await userDataMapper.delete(req.params.id);
        return res.status(204).json();
    },

    async login(req, res) {

        const foundUser = await userDataMapper.findByEmail(req.body.email);

        if (!foundUser) {
            throw new ApiError('Email/password does not match', { statusCode: 401 });
        }

        const validPassword = await bcrypt.compare(req.body.password, foundUser.password);

        if (!validPassword) {
            throw new ApiError('Email/password does not match', { statusCode: 401 })
        };

        req.session.user = foundUser

        // const token = jwt.create(foundUser);
        // res.header('Authorization', 'Bearer ' + token);
        // const secret = process.env.JWT_SECRET;

        // if (!token) {
        //     throw new ApiError('Token required', { statusCode: 401 })
        // }

        return res.json(req.session.user)
    },

    async disconnect(req, res) {

        if (!req.session.user) {
            throw new ApiError('You need to be logged to disconnect')
        }

        req.session.destroy();
        // delete req.session.user;

        res.status(204).json();
    }
};
