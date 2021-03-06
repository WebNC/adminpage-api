const express = require('express');

const router = express.Router();
const auth = require('../config/auth');
const userControllers = require('../controllers/userControllers');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});
router.post('/login', auth.optional, userControllers.login);
router.post('/register', auth.optional, userControllers.register);
router.get('/me', auth.required, userControllers.me);


module.exports = router;
