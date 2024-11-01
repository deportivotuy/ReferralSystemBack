const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');

const router = express.Router();

router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('El email no puede estar vacío.'),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  userController.registerUser
);
 
router.post(
    '/login',
    [
        body('username')
            .isLength({ min: 6 }).withMessage('The user must have a minimum of 6 digits.')
            .notEmpty().withMessage('User cannot be empty.'),
        
        body('password')
            .exists().withMessage('Password is required.')
            .notEmpty().withMessage('Password cannot be empty.')
            .isLength({ min: 6 }).withMessage('The password must have a minimum of 6 digits.'),
    ],
    userController.loginUser
);

module.exports = router;
