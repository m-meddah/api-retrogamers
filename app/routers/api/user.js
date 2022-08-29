const express = require('express');

const validate = require('../../validation/validator');
const createSchema = require('../../validation/schemas/userCreateSchema');
const updateSchema = require('../../validation/schemas/userUpdateSchema');

const { userController: controller } = require('../../controllers');
const loginController = require('../../helpers/checkLogged');
const adminController = require('../../helpers/checkAdmin');
const collectionController = require('../../controllers/collection');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();


router
    .route('/')
    /**
     * GET /api/users
     * @summary Get all users
     * @tags User
     * @return {[User]} 200 - succes response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .get(adminController.checkAdmin, controllerHandler(controller.getAll))
    /**
     * POST /api/users
     * @summary Create a new user
     * @tags User
     * @param {InputUser} request.body.required - user informations
     * @return {User} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .post(validate('body', createSchema), controllerHandler(controller.create));

router
    .route('/:id(\\d+)')
    /**
     * GET /api/users/{id}
     * @summary Get one user
     * @tags User
     * @param {number} id.path.required - User identifier
     * @return {User} 200 - success response -application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found- application/json
     */
    .get(controllerHandler(controller.getOne))
    /**
     * PATCH /api/users/{id}
     * @summary Update one user
     * @tags User
     * @param {number} id.path.required - User identifier
     * @param {InputUser} request.body - User info
     * @return {User} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found - application/json
     */
    .patch(loginController.checkLogged, validate('body', updateSchema), controllerHandler(controller.update))
    /**
     * DELETE /api/users/{id}
     * @summary Delete one user
     * @tags User
     * @param {number} id.path.required - user identifier
     * @return {User} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found - application/json
     */
    .delete(loginController.checkLogged, controllerHandler(controller.delete));

router
    .route('/:id/collections')
    /**
     * GET /api/users/{id}/collections
     * @summary Get collections of the user
     * @tags User
     * @param {number} id.path.required - user identifier
     * @return {Collection} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User/collection not found- application/json
     */
    .get(loginController.checkLogged, controllerHandler(collectionController.getAllByUserId))

router
    .route('/:id/collections/systems')
    /**
     * GET /api/users/{id}/collections/systems
     * @summary Get systems of the user
     * @tags User
     * @param {number} id.path.required - user identifier
     * @return {Collection} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User/collection not found- application/json
     */
    .get(loginController.checkLogged, controllerHandler(collectionController.getSystemsByUser))


router
    .route('/:id/collections/games')
    /**
     * GET /api/users/{id}/collections/games
     * @summary Get games of the user
     * @tags User
     * @param {number} id.path.required - user identifier
     * @return {Collection} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User/collection not found- application/json
     */
    .get(loginController.checkLogged, controllerHandler(collectionController.getGamesByUser))

router
    .route('/login')
    /**
     * POST /api/users/login
     * @summary Connect to the user session
     * @tags User
     * @param {InputLogin} request.body.required - user informations
     * @return {User} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found - application/json
     */
    .post(controllerHandler(controller.login))

/**
 * GET /api/users/logout
 * @summary Disconnect the user session
 * @tags User
 * @return {User} 200 - success response - application/json
 * @return {ApiError} 400 - Bad request response - application/json
 */
router.get('/logout', controllerHandler(controller.disconnect));

module.exports = router;