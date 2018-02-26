var express = require('express');
var router = express.Router();
var auth = require('./auth');
var fetchAnimals = require('./fetchAnimals');

/*
 * Routes that can be accessed by any one
 */
router.post('/signin', auth.login);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/animals', fetchAnimals.getAnimals);

module.exports = router;