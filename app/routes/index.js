var express = require('express');
var router = express.Router();
var auth = require('./auth');
var fetchAnimals = require('./fetchAnimals');
var printNumbers = require('./printNumbers');

/*
 * Routes that can be accessed by any one
 */
router.post('/signin', auth.login);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/animals', fetchAnimals.getAnimals);
router.get('/api/v1/printNumbers', printNumbers.numberPatterns);

module.exports = router;