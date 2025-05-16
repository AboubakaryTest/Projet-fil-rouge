const { body, validationResult } = require('express-validator');

const validateRegister = [
  body('email').isEmail().withMessage('Email invalide'),
  body('username').notEmpty().withMessage('Nom requis'),
  body('password')
    .isLength({ min: 12 }).withMessage('Mot de passe trop court (min. 12 caractères)')
    .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir une majuscule')
    .matches(/[0-9]/).withMessage('Le mot de passe doit contenir un chiffre')
    .matches(/[^A-Za-z0-9]/).withMessage('Le mot de passe doit contenir un caractère spécial'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  }
];

module.exports = {
  validateRegister
};
