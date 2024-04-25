const express = require('express');
const { getUserDetails, updateName, updatePassword, deleteAccount } = require('../controllers/userController');
const { authenticateUser } = require('../Middleware/userMiddleware');
const router = express.Router();

router.get('/details', authenticateUser, getUserDetails);
router.patch('/update/name', authenticateUser, updateName);
router.patch('/update/password', authenticateUser, updatePassword);
router.delete('/delete', authenticateUser, deleteAccount);

module.exports = router;
