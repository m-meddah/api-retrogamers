/**
 * @typedef {object} ApiError
 * @property {string} message - Error message
 * @property {string} name - Error name
 * @property {object} infos - Additionnal informations
 */
 module.exports = class ApiError extends Error {
    constructor(message, infos) {

        super(message, infos);

        this.name = 'ApiError';

        this.infos = infos;
    }
};