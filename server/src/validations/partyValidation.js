import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  createParty: [
    check('name')
      .trim()
      .exists().withMessage('Name must be specified')
      .custom(value => notEmpty(value, 'Name field is required')),
    check('hqAddress')
      .trim()
      .exists().withMessage('HQ Address must be specified')
      .custom(value => notEmpty(value, 'HQ Address is required')),
    check('fullname')
      .trim()
      .exists().withMessage('Fullname must be specified')
      .custom(value => notEmpty(value, 'Fullname field is required')),
    check('logoUrl')
      .trim()
      .exists().withMessage('Logo URL must be specified')
      .custom(value => notEmpty(value, 'Logo URL is required'))
      .isURL()
      .withMessage('Logo URL must be a URL'),
  ],
  update: [
    check('name')
      .custom(value => notEmpty(value, 'Name field is required')),
  ],
};
