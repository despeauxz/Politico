import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  createParty: [
    check('name')
      .exists().withMessage('Name must be specified')
      .custom(value => notEmpty(value, 'Name field cannot be left blank')),
    check('fullname')
      .exists().withMessage('fullname must be specified')
      .custom(value => notEmpty(value, 'Fullname field cannot be left blank')),
    check('hqAddress')
      .exists().withMessage('HQ Address must be specified')
      .custom(value => notEmpty(value, 'HQ Address field cannot be left blank')),
    check('logoUrl')
      .exists().withMessage('Logo URL must be specified')
      .custom(value => notEmpty(value, 'Logo URL field cannot be left blank')),
  ],
  update: [
    check('name')
      .custom(value => notEmpty(value, 'Name field cannot be left blank')),
  ],
};
