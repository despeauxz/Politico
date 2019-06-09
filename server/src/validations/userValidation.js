import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  signup: [
    check('firstname')
      .trim()
      .exists()
      .withMessage('Firstname must be specific')
      .custom(value => notEmpty(value, 'Firstname is required')),
    check('lastname')
      .trim()
      .exists()
      .withMessage('Lastname must be specific')
      .custom(value => notEmpty(value, 'Lastname is required')),
    check('email')
      .trim()
      .exists()
      .withMessage('Email must be specific')
      .custom(value => notEmpty(value, 'Email is required'))
      .isEmail()
      .withMessage('Please input a valid email address'),
    check('password')
      .trim()
      .exists().withMessage('Password field is required')
      .isLength({ min: 6 })
      .withMessage('Password must be minimum of 6 characters'),
    check('passwordConfirm', 'Passwords don\'t match')
      .trim()
      .custom(value => notEmpty(value, 'Password Confirm field field cannot be left blank'))
      .custom((value, { req }) => value === req.body.password),
  ],
  login: [
    check('email')
      .trim()
      .normalizeEmail()
      .exists()
      .withMessage('Email must be specific')
      .custom(value => notEmpty(value, 'Email is required'))
      .isEmail()
      .withMessage('Please input a valid email address'),
    check('password')
      .trim()
      .exists().withMessage('Password must be specified')
      .custom(value => notEmpty(value, 'Password field cannot be left blank')),
  ],
  forgotPassword: [
    check('email')
      .trim()
      .normalizeEmail()
      .exists()
      .withMessage('Email must be specific')
      .custom(value => notEmpty(value, 'email field cannot be left blank'))
      .isEmail()
      .withMessage('Please input a valid email address'),
  ],
  resetPassword: [
    // check('password')
    //   .trim()
    //   .exists().withMessage('Password field is required')
    //   .isLength({ min: 6 })
    //   .withMessage('Password must be minimum of 6 characters'),
    // check('passwordConfirm', 'Passwords don\'t match')
    //   .trim()
    //   .custom(value => notEmpty(value, 'Password Confirm field field cannot be left blank'))
    //   .custom((value, { req }) => value === req.body.password),
  ],
};
