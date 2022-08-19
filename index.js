require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const multer = require('multer');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const sessionController = require('./app/helpers/checkUser');

const router = require('./app/routers');

const port = process.env.PORT || 3080;

const app = express();

const options = {
    info: {
        version: '1.0.0',
        title: 'RetrOgamers',
        description: 'Application pour créer sa bibliothèque vidéoludique axé sur le rétro gaming'
    },
    baseDir: __dirname,
    filesPattern: './**/*.js',
    swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE,
    exposeSwaggerUI: true,
    exposeApiDocs: true,
    apiDocsPath: '/api/docs'
};

/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns Express JSDoc Swagger middleware that create web documentation
 */
expressJSDocSwagger(app)(options);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60,
    }
}));

app.use(cors(process.env.CORS_DOMAINS ?? '*'));

const mutipartParser = multer();
app.use(mutipartParser.none());

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use(sessionController.checkUser);

app.use(router);

app.listen(port, () => {
    console.log(`http://localhost:${port}/api`)
})