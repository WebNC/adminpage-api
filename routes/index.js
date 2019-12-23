/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const accountController = require('../controllers/accountController');
const skillController = require('../controllers/skillController');
const contractController = require('../controllers/contractController');
const reportController = require('../controllers/reportController');
const chartController = require('../controllers/chartController');
const topIncomeController = require('../controllers/topIncomeController');
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
router.post('/report/detail', reportController.getChat);

router.post('/change-pass', accountController.changePass);
router.post('/edit', accountController.edit);

router.get('/chart/income-data/year', chartController.getIncomeData);
router.get('/chart/income-data/month', chartController.getIncomeDataMonth);
router.get('/chart/income-data/range', chartController.getIncomeDataRange);


router.get('/top-teacher-income-list/all', topIncomeController.getTopTeacherIncome);
router.post('/top-teacher-income-list/date', topIncomeController.getTopTeacherIncomeDay);
router.post('/top-teacher-income-list/month', topIncomeController.getTopTeacherIncomeMonth);
router.post('/top-teacher-income-list/range', topIncomeController.getTopTeacherIncomeRange);

router.get('/top-skill-income-list/all', topIncomeController.getTopSkillIncome);
router.post('/top-skill-income-list/date', topIncomeController.getTopSkillIncomeDay);
router.post('/top-skill-income-list/month', topIncomeController.getTopSkillIncomeMonth);
router.post('/top-skill-income-list/range', topIncomeController.getTopSkillIncomeRange);
module.exports = router;
