const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


// Routes publiques
router.post('/register', userController.register);
router.post('/login', userController.login);

// Routes protégées
router.get('/me', auth, userController.getProfile);
router.put('/update', auth, userController.updateProfile);
router.delete('/delete', auth, userController.deleteProfile);

module.exports = router;
