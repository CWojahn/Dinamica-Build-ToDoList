const express = require('express');
const routes = express.Router();
const authMiddleWare = require('./controllers/authMiddleware');
const userProfileController = require('./controllers/userProfileController');
const userActivitiesController = require('./controllers/userActivitiesController');
const userBuildsController = require('./controllers/userBuildsController');
const userTasksController = require('./controllers/userTasksController');

routes.get('/login', userProfileController.index);

routes.get('/activity', authMiddleWare, userActivitiesController.index);

routes.get('/builds', authMiddleWare, userBuildsController.index);

routes.get('/tasks', authMiddleWare, userTasksController.index);
module.exports = routes;
