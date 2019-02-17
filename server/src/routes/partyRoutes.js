import express from 'express';
import PartyController from '../controllers/PartyController';
import partyValidation from '../validations/partyValidation';
import ValidationHandler from '../middlewares/ValidationHandler';
import Trim from '../middlewares/Trim';
import Authorization from '../middlewares/Authorization';


const partyRoutes = express.Router();
const validation = [ValidationHandler.validate, Trim.trim, ValidationHandler.isEmptyReq];
partyRoutes.use(Authorization.authenticate);

partyRoutes.post('/', Authorization.isAdmin, partyValidation.createParty, validation, PartyController.create);
partyRoutes.get('/', PartyController.getAll);
partyRoutes.get('/:id', PartyController.getParty);
partyRoutes.patch('/:id/name', Authorization.isAdmin, partyValidation.update, validation, PartyController.update);
partyRoutes.delete('/:id', Authorization.isAdmin, PartyController.delete);


export default partyRoutes;
