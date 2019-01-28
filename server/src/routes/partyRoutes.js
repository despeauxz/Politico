import express from 'express';
import PartyController from '../dummycontroller/PartyController';
import partyValidation from '../validations/partyValidation';
import ValidationHandler from '../middlewares/ValidationHandler';

const partyRoutes = express.Router();
const validation = [ValidationHandler.validate, ValidationHandler.isEmptyReq];

partyRoutes.post('/', partyValidation.createParty, validation, PartyController.create);


export default partyRoutes;
