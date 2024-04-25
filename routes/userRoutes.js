const express = require('express');
const userController = require('../controllers/userController');
const { authenticateUser } = require('../Middleware/userMiddleware');
const router = express.Router();

router.get('/details',authenticateUser, userController.getUserDetails);
router.patch('/update/name',authenticateUser ,userController.updateName);
router.patch('/update/password', authenticateUser,userController.updatePassword);
router.delete('/delete', authenticateUser,userController.deleteAccount);

module.exports = router;
