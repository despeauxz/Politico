import express from 'express';
import OfficeController from '../controllers/OfficeController';
import officeValidation from '../validations/officeValidation';
import ValidationHandler from '../middlewares/ValidationHandler';
import Trim from '../middlewares/Trim';
import Authorization from '../middlewares/Authorization';


const officeRoutes = express.Router();
const validation = [ValidationHandler.validate, Trim.trim, ValidationHandler.isEmptyReq];
officeRoutes.use(Authorization.authenticate);

officeRoutes.post('/', Authorization.isAdmin, officeValidation.createOffice, validation, OfficeController.create);
officeRoutes.get('/', OfficeController.getOffices);
officeRoutes.get('/:id', OfficeController.getOfficeByID);
officeRoutes.patch('/:id', Authorization.isAdmin, officeValidation.update, validation, OfficeController.update);
officeRoutes.delete('/:id', Authorization.isAdmin, OfficeController.delete);

export default officeRoutes;
