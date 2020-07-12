const express = require('express');
const router = express.Router();
const passport  = require('passport');
const doctorController = require('../../controllers/api/doctor_controller');
const patientController = require('../../controllers/api/patients_controller');

router.post('/doctors/register',doctorController.register);
router.post('/doctors/login',doctorController.login);
router.post('/patients/register',passport.authenticate('jwt',{session:false}),patientController.register);
router.post('/patients/:id/create_report',passport.authenticate('jwt',{session:false}),patientController.createReport);
router.post('/patients/:id/all_reports',patientController.allReports);


module.exports = router;