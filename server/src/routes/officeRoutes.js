import express from 'express';
import OfficeController from '../dummycontroller/OfficeController';
import officeValidation from '../validations/officeValidation';
import ValidationHandler from '../middlewares/ValidationHandler';


const officeRoutes = express.Router();
const validation = [ValidationHandler.validate, ValidationHandler.isEmptyReq];

officeRoutes.post('/', officeValidation.createOffice, validation, OfficeController.create);
officeRoutes.get('/', OfficeController.getOffices);
officeRoutes.get('/:id', OfficeController.getOfficeByID);

export default officeRoutes;
