/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const accountController = require('../controllers/accountController');
const skillController = require('../controllers/skillController');
const contractController = require('../controllers/contractController');
const reportController = require('../controllers/reportController');
/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});




router.get('/user-list/teacher/number', accountController.getNumberUserTeacher);
router.get('/user-list/teacher/:page', accountController.getAllUserTeacher);
router.get('/user-list/student/number', accountController.getNumberUserStudent);
router.get('/user-list/student/:page', accountController.getAllUserStudent);


router.get('/user-detail/:id', accountController.getUserDetail);
router.get('/user/block/:id', accountController.blockUser);
router.get('/user/unblock/:id', accountController.unblockUser);

router.get('/skill-list/read/:page', skillController.getSkill);
router.get('/skill-list', skillController.getAllSkill);

router.get('/skill-list/number', skillController.getNumberSkill);
router.post('/skill-list/create', skillController.createSkill);
router.post('/skill-list/update', skillController.updateSkill);
router.post('/skill-list/delete', skillController.deleteSkill);


router.get('/contract-list/number', contractController.getNumContractList);
router.get('/contract-list/:page', contractController.getContractList);

router.get('/report-list/number', reportController.getNumContractList);
router.get('/report-list/:page', reportController.getReportList);
router.post('/report/solve-report', reportController.solveReport);

router.post('/change-pass', accountController.changePass);
router.post('/edit', accountController.edit);

module.exports = router;
