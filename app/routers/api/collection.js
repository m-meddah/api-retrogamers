const express = require('express');
// const sessionController = require('../../helpers/checkUser');
const loginController = require('../../helpers/checkLogged');
const adminController = require('../../helpers/checkAdmin');

const { collectionController: controller} = require('../../controllers');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
    * GET /api/collections
    * @summary Get all collections
    * @tags Collection
    * @return {[Collection]} 200 - success response - application/json
    */
    .get(adminController.checkAdmin, controllerHandler(controller.getAll))

router
    .route('/:id(\\d+)')
    /**
     * GET /api/collections/{id}
     * @summary Get one collection
     * @tags Collection
     * @param {number} id.path.required - Collection identifier
     * @return {Collection} 200 - success response -application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found- application/json
     */
    .get(loginController.checkLogged, controllerHandler(controller.getOne))
    /**
     * DELETE /api/collections/{id}
     * @summary Delete one collection
     * @tags Collection
     * @param {number} id.path.required - collection identifier
     * @return {Collection} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - Post not found - application/json
     */
    .delete(loginController.checkLogged, controllerHandler(controller.delete));

router
    .route('/:id/details')
    /**
     * GET /api/collections/{id}/details
     * @summary Get one collection in detail
     * @tags Collection
     * @param {number} id.path.required - Collection identifier
     * @return {CollectionDetails} 200 - success response -application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found- application/json
     */
    .get(loginController.checkLogged, controllerHandler(controller.getOneDetails));

router
    .route('/:id/systems')
    /**
     * GET /api/collections/{id}/systems
     * @summary Get all systems of one collection
     * @tags Collection
     * @param {number} id.path.required - Collection identifier
     * @return {CollectionDetails} 200 - success response -application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - System not found- application/json
     */
    .get(loginController.checkLogged, controllerHandler(controller.getAllSystems))
    
    /**
     * POST /api/collections/{id}/systems
     * @summary Add a new system into collection
     * @tags Collection
     * @param {number} id.path.required - Collection identifier
     * @param {number} request.body.required - system identifier
     * @param {number} request.body.required - Collection identifier json
     * @return {InputCollectionSystem} 200 - success response -application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - System not found- application/json
     */
    .post(loginController.checkLogged, controllerHandler(controller.addSystem))
    /**
     * DELETE /api/collections/{id}/systems
     * @summary Remove a system into collection
     * @tags Collection
     * @param {number} id.path.required - Collection identifier
     * @return {Collection} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - System not found- application/json
     */
    .delete(loginController.checkLogged, controllerHandler(controller.removeSystem))

router
    .route('/:id/games')
    /**
     * GET /api/collections/{id}/games
     * @summary Get all games of one collection
     * @tags Collection
     * @param {number} id.path.required - Collection identifier
     * @return {Collection} 200 - success response -application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found- application/json
     */
    .get(loginController.checkLogged, controllerHandler(controller.getAllGames))
    /**
     * POST /api/collections/{id}/games
     * @summary Add a new game into collection
     * @tags Collection
     * @param {number} id.path.required - Collection identifier
     * @return {Collection} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - System not found- application/json
     */
    .post(loginController.checkLogged, controllerHandler(controller.addGame))
    /**
     * DELETE /api/collections/{id}/games
     * @summary Remove a game into collection
     * @tags Collection
     * @param {number} id.path.required - Collection identifier
     * @return {Collection} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - System not found- application/json
     */
    .delete(loginController.checkLogged, controllerHandler(controller.removeGame))

module.exports = router;