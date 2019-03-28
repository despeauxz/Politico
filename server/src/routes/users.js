import multer from 'multer';
import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import UserController from '../controllers/UserController';
import UserValidation from '../validations/userValidation';
import Authorization from '../middlewares/Authorization';
import Trim from '../middlewares/Trim';

const userRoutes = express.Router();
const validation = [ValidationHandler.validate, Trim.trim, ValidationHandler.isEmptyReq];


userRoutes.post('/signup', UserValidation.signup, validation, UserController.signup);
userRoutes.post('/login', UserValidation.login, validation, UserController.login);
userRoutes.post('/forgot_password', UserValidation.forgotPassword, validation, UserController.forgotPassword);
userRoutes.patch('/join-party', Authorization.authenticate, UserController.updateUserParty);
userRoutes.patch('/user', Authorization.authenticate, UserController.user);
userRoutes.get('/details', Authorization.authenticate, Authorization.isAdmin, UserController.details);

export default userRoutes;
