import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  createUser: [
    check('firstname')
      .trim()
      .exists().withMessage('Firstname must be specific')
      .custom(value => notEmpty(value, 'Firstname field cannot be left blank')),
    check('lastname')
      .trim()
      .exists().withMessage('Lastname must be specific')
      .custom(value => notEmpty(value, 'Lastname field cannot be left blank')),
    check('othername')
      .trim()
      .exists().withMessage('Othername must be specific')
      .custom(value => notEmpty(value, 'Othername field cannot be left blank')),
    check('email')
      .trim()
      .exists().withMessage('Email must be specific')
      .custom(value => notEmpty(value, 'email field cannot be left blank'))
      .isEmail()
      .withMessage('Please input an email address'),
    check('digit')
      .trim()
      .exists().withMessage('Phone number must be specified')
      .custom(value => notEmpty(value, 'Phone number field cannot be left blank'))
      .isNumeric()
      .withMessage('Please input valid number'),
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
};
