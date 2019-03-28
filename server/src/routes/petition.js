import express from 'express';
import PetitionController from '../controllers/PetitionController';
import petitionValidation from '../validations/petitionValidation';
import ValidationHandler from '../middlewares/ValidationHandler';
import Authorization from '../middlewares/Authorization';
import Trim from '../middlewares/Trim';

const petition = express.Router();
const validation = [ValidationHandler.validate, Trim.trim, ValidationHandler.isEmptyReq];
petition.use(Authorization.authenticate);

petition.post('/', petitionValidation.create, validation, PetitionController.create);
petition.get('/', Authorization.isAdmin, PetitionController.getAll);

export default petition;
