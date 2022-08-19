const express = require('express');

const validate = require('../../validation/validator');
const createSchema = require('../../validation/schemas/contactCreateSchema');
const adminController = require('../../helpers/checkAdmin')
const { contactController: controller } = require('../../controllers');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
    * GET /api/contact
    * @summary Get all messages
    * @tags Contact
    * @return {[Contact]} 200 - success response - application/json
    */
    .get(adminController.checkAdmin, controllerHandler(controller.getAll))

    /**
     * POST /api/contact
     * @summary Create a new message
     * @tags Contact
     * @param {InputContact} request.body.required - user informations
     * @return {Contact} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .post(validate('body', createSchema), controllerHandler(controller.create));


router
    .route('/:id(\\d+)')
    /**
     * GET /api/contact/{id}
     * @summary Get one message
     * @tags Contact
     * @param {number} id.path.required - message identifier
     * @return {Contact} 200 - success response -application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found- application/json
     */
    .get(adminController.checkAdmin, controllerHandler(controller.getOne))

    /**
     * DELETE /api/contact/{id}
     * @summary Delete one message
     * @tags Contact
     * @param {number} id.path.required - message identifier
     * @return {Contact} 200 - success response -application/json
     * @return {ApiError} 400 - Bad request response -application/json
     * @return {ApiError} 404 - Message not found- application/json
     */
    .delete(adminController.checkAdmin, controllerHandler(controller.delete));

module.exports = router;
