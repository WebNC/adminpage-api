const express = require('express');

const router = express.Router();
const accountController = require('../controllers/accountController') 
const skillController = require('../controllers/skillController')
/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/user-list/:page',accountController.getAllUser);
router.get('/user-list/number',accountController.getNumberUser);
router.get('/user-detail/:id',accountController.getUserDetail);
router.get('/user/block/:id',accountController.blockUser);

router.get('/skill-list/read',skillController.getSkill);
router.post('/skill-list/create',skillController.createSkill);
router.post('/skill-list/update',skillController.updateSkill);
router.post('/skill-list/delete', skillController.deleteSkill);

module.exports = router;
