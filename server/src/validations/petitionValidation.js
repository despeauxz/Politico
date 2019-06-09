import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  create: [
    check('title')
      .trim()
      .exists().withMessage('Title must be specified')
      .custom(value => notEmpty(value, 'Title is required')),
    check('text')
      .trim()
      .exists().withMessage('Text body must be specified')
      .custom(value => notEmpty(value, 'Text is required')),
    check('officeId')
      .trim()
      .exists().withMessage('Office Id must be specified')
      .custom(value => notEmpty(value, 'Office Id cannot be left blank'))
      .isInt()
      .withMessage('Must be an Integer'),
  ],
};
