const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const rateLimit = require('express-rate-limit');
const { validateRegister } = require('../middleware/validateUser');


// Routes publiques
router.post('/register', userController.register);
router.post('/login', userController.login);

// Routes protégées
router.get('/me', auth, userController.getProfile);
router.put('/update', auth, userController.updateProfile);
router.delete('/delete', auth, userController.deleteProfile);

//Réduction du nombre de tentavives de Login a 3
router.post('/login', loginLimiter, userController.login);

//Validation de user
router.post('/register', validateRegister, userController.register);


//
router.get('/masked', auth, userController.maskedUsers);


module.exports = router;
