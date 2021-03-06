const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);
//use api as routes to api folder
router.use('/api',require('./api'));

module.exports = router;