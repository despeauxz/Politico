import express from 'express';
import OfficeController from '../controllers/OfficeController';
import officeValidation from '../validations/officeValidation';
import votesValidation from '../validations/votesValidation';
import ValidationHandler from '../middlewares/ValidationHandler';
import Trim from '../middlewares/Trim';
import Authorization from '../middlewares/Authorization';


const officeRoutes = express.Router();
const validation = [ValidationHandler.validate, Trim.trim, ValidationHandler.isEmptyReq];
officeRoutes.use(Authorization.authenticate);

officeRoutes.post('/', officeValidation.createOffice, validation, Authorization.isAdmin, OfficeController.create);
officeRoutes.get('/', OfficeController.getOffices);
officeRoutes.get('/:id', OfficeController.getOfficeByID);

export default officeRoutes;
