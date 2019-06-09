import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  createOffice: [
    check('type')
      .trim()
      .exists().withMessage('Type must be specified')
      .custom(value => notEmpty(value, 'Type field is required'))
      .isIn(['Federal', 'Legislative', 'State', 'Local'])
      .withMessage('Office type does not exist'),
    check('name')
      .trim()
      .exists().withMessage('Name must be specified')
      .custom(value => notEmpty(value, 'Name field is required')),
  ],
  update: [
    check('name')
      .trim()
      .exists().withMessage('Name must be specified')
      .custom(value => notEmpty(value, 'Name field is required'))
      .optional(),
    check('type')
      .trim()
      .exists().withMessage('Type must be specified')
      .custom(value => notEmpty(value, 'Type field is required'))
      .isIn(['Federal', 'Legislative', 'State', 'Local'])
      .withMessage('Office type does not exist')
      .optional(),
    check('electionDate')
      .trim()
      .exists().withMessage('Date must be specified')
      .custom(value => notEmpty(value, 'Date field is required'))
      .toDate()
      .optional(),
  ],
};
