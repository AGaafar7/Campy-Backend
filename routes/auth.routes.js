import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validateSignUp, validateSignIn, validate } from '../utils/validators.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const authRouter = Router();

authRouter.post('/sign-up', validateSignUp, validate, authController.signUp);

authRouter.post('/sign-in', validateSignIn, validate, authController.signIn);

authRouter.post('/sign-out', verifyToken, authController.signOut);

export default authRouter;