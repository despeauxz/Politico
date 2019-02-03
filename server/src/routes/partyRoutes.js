import express from 'express';
import PartyController from '../controllers/PartyController';
import partyValidation from '../validations/partyValidation';
import ValidationHandler from '../middlewares/ValidationHandler';
import Trim from '../middlewares/Trim';


const partyRoutes = express.Router();
const validation = [ValidationHandler.validate, Trim.trim, ValidationHandler.isEmptyReq];

partyRoutes.post('/', partyValidation.createParty, validation, PartyController.create);
partyRoutes.get('/', PartyController.getAll);
partyRoutes.get('/:id', PartyController.getParty);
partyRoutes.patch('/:id/name', partyValidation.update, validation, PartyController.update);
partyRoutes.delete('/:id', PartyController.delete);


export default partyRoutes;
