import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
    createOffice: [
        check('type')
            .trim()
            .exists().withMessage('Type must be specified')
            .custom(value => notEmpty(value, 'Type field cannot be left blank'))
            .isIn(['Federal', 'Legislative', 'State', 'Local'])
            .withMessage('Office type does not exist'),
        check('name')
            .trim()
            .exists().withMessage('Name must be specified')
            .custom(value => notEmpty(value, 'Name field cannot be left blank')),  
    ],
};
