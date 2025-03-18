const express = require('express');
const auth = require('../middleware/authMiddleware');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', auth, userController.getUser);
router.put('/update', auth, userController.updateUser);

module.exports = router;
