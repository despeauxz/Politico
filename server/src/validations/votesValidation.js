import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  candidates: [
    check('officeId')
      .exists()
      .withMessage('Office ID must be specific')
      .custom(value => notEmpty(value, 'Office ID field cannot be left blank'))
      .isNumeric()
      .withMessage('Office ID must be an Integer'),
    check('partyId')
      .exists()
      .withMessage('Party Id must be specific')
      .custom(value => notEmpty(value, 'Party ID field cannot be left blank'))
      .isNumeric()
      .withMessage('Office ID must be an Integer'),
  ],
  votes: [
    check('officeId')
      .custom(value => notEmpty(value, 'Office ID field cannot be left blank'))
      .isNumeric()
      .withMessage('Office ID must be an Integer'),
    check('candidateId')
      .custom(value => notEmpty(value, 'Candidate ID field cannot be left blank'))
      .isNumeric()
      .withMessage('Candidate ID must be an Integer'),
  ],
};
