const express = require('express');

const { systemController: controller } = require('../../controllers');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

/**
* GET /api/systems
* @summary Get all systems
* @tags System
* @return {[System]} 200 - succes response - application/json
*/
router.get('/', controllerHandler(controller.getAll));

/**
 * GET /api/systems/{id}
 * @summary Get one system
 * @tags System
 * @param {number} id.path.required - system identifier
 * @return {System} 200 - success response -application/json
 * @return {ApiError} 400 - Bad requestresponse - application/json
 * @return {ApiError} 404 - System not found- application/json
 */
router.get('/:id(\\d+)', controllerHandler(controller.getOne));

/**
 * GET /api/systems/{id}/games
 * @summary Get all games from a selected system
 * @tags System
 * @param {number} id.path.required - system identifier
 * @return {System} 200 - success response -application/json
 * @return {ApiError} 400 - Bad requestresponse - application/json
 * @return {ApiError} 404 - System not found- application/json
 */
router.get('/:id/games', controllerHandler(controller.getAllGames));

/**
 * GET /api/systems/{id}/details
 * @summary Get all games details from a selected system
 * @tags System
 * @param {number} id.path.required - system identifier
 * @return {System} 200 - success response -application/json
 * @return {ApiError} 400 - Bad requestresponse - application/json
 * @return {ApiError} 404 - System not found or details not yet uploaded- application/json
 */
router.get('/:id/details', controllerHandler(controller.getAllDesc));

module.exports = router;