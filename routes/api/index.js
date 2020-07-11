const express = require('express');
const router = express.Router();
const doctorController = require('../../controllers/api/doctor_controller');

router.post('/doctor/register',doctorController.register);
router.post('/doctor/login',doctorController.login);


module.exports = router;