const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const rateLimit = require('express-rate-limit');
const { validateRegister } = require('../middleware/validateUser');


//Réduction du nombre de tentavives de Login a 3
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 3, // max 5 tentatives
  message: { error: "Trop de tentatives, réessayez plus tard." }
});
router.post('/login', loginLimiter, userController.login);

// Routes publiques
router.post('/register', userController.register);
router.post('/login', userController.login);

// Routes protégées
router.get('/me', auth, userController.getProfile);
router.put('/update', auth, userController.updateProfile);
router.delete('/delete', auth, userController.deleteProfile);

//Validation de user
router.post('/register', validateRegister, userController.register);


//
router.get('/masked', auth, userController.maskedUsers);


module.exports = router;
