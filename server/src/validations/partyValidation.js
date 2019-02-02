import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  createParty: [
    check('name')
      .trim()
      .exists().withMessage('Name must be specified')
      .custom(value => notEmpty(value, 'Name field cannot be left blank')),
    check('fullname')
      .trim()
      .exists().withMessage('fullname must be specified')
      .custom(value => notEmpty(value, 'Fullname field cannot be left blank')),
    check('hqAddress')
      .trim()
      .exists().withMessage('HQ Address must be specified')
      .custom(value => notEmpty(value, 'HQ Address field cannot be left blank')),
    check('logoUrl')
      .trim()
      .exists().withMessage('Logo URL must be specified')
      .custom(value => notEmpty(value, 'Logo URL field cannot be left blank'))
      .isURL()
      .withMessage('Logo URL must be a URL'),
  ],
  update: [
    check('name')
      .custom(value => notEmpty(value, 'Name field cannot be left blank')),
  ],
};
