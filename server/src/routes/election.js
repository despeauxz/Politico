import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import ElectionController from '../controllers/ElectionController';
import votesValidation from '../validations/votesValidation';
import Authorization from '../middlewares/Authorization';
import Trim from '../middlewares/Trim';

const electionRoutes = express.Router();
const validation = [ValidationHandler.validate, Trim.trim, ValidationHandler.isEmptyReq];

electionRoutes.use(Authorization.authenticate);

electionRoutes.post('/:id/register', Authorization.isAdmin, votesValidation.candidates, validation, ElectionController.candidates);
electionRoutes.get('/:id/result', ElectionController.getResults);
electionRoutes.patch('/candidate/:id', Authorization.isAdmin, ElectionController.confirm);

export default electionRoutes;
