import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import VotesController from '../controllers/VotesController';
import VotesValidation from '../validations/votesValidation';
import Authorization from '../middlewares/Authorization';
import Trim from '../middlewares/Trim';

const votesRoutes = express.Router();
const validation = [ValidationHandler.validate, Trim.trim, ValidationHandler.isEmptyReq];

votesRoutes.use(Authorization.authenticate);

votesRoutes.post('/', VotesValidation.votes, validation, VotesController.vote);
votesRoutes.get('/history', VotesController.history);


export default votesRoutes;
