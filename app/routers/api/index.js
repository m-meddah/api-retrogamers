const express = require('express');

const systemRouter = require('./system');
const userRouter = require('./user');
const contactRouter = require('./contact');
const gameRouter = require('./game');
const collectionRouter = require('./collection');
const { apiController } = require('../../controllers');
const { ApiError } = require('../../helpers/errorHandler');

const router = express.Router();

router.all('/', apiController.home);

router.use('/systems', systemRouter);

router.use('/users', userRouter);

router.use('/contact', contactRouter);

router.use('/games', gameRouter);

router.use('/collections', collectionRouter)

router.use(() => {
    throw new ApiError('API route not found', { statusCode: 404 });
});

module.exports = router;