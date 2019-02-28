import multer from 'multer';
import express from 'express';
import ValidationHandler from '../middlewares/ValidationHandler';
import UserController from '../controllers/UserController';
import UserValidation from '../validations/userValidation';
import Authorization from '../middlewares/Authorization';
import Trim from '../middlewares/Trim';

const userRoutes = express.Router();
const validation = [ValidationHandler.validate, Trim.trim, ValidationHandler.isEmptyReq];
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${req.user.firstname}-${Date.now()}.jpg`),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }
  cb(null, false); 
};

const upload = multer({
  storage,
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 0.3,
  },
  fileFilter,
});


userRoutes.post('/signup', UserValidation.signup, validation, UserController.signup);
userRoutes.post('/login', UserValidation.login, validation, UserController.login);
userRoutes.post('/forgot_password', UserValidation.forgotPassword, validation, UserController.forgotPassword);
userRoutes.patch('/user', Authorization.authenticate, upload.single('avatar'), UserController.user);
userRoutes.get('/details', Authorization.authenticate, Authorization.isAdmin, UserController.details);

export default userRoutes;
