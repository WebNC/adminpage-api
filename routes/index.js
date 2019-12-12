const express = require('express');

const router = express.Router();
const accountController = require('../controllers/accountController');
const skillController = require('../controllers/skillController');
const contractController = require('../controllers/contractController');
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

router.get('/skill-list/read', skillController.getSkill);
router.post('/skill-list/create', skillController.createSkill);
router.post('/skill-list/update', skillController.updateSkill);
router.post('/skill-list/delete', skillController.deleteSkill);


router.get('/contract-list/number', contractController.getNumContractList);
router.get('/contract-list/:page', contractController.getContractList);

module.exports = router;
