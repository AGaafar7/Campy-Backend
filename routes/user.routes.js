import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { validateUpdateUser, validate } from '../utils/validators.js';

const userRouter = Router();

// Get all users
userRouter.get('/', userController.getAllUsers);

// Get user by ID
userRouter.get('/:id', userController.getUserById);

// Get user's courses
userRouter.get('/:id/courses', userController.getUserCourses);

// Create user (protected - admin only)
userRouter.post('/', verifyToken, userController.createUser);

// Update user (protected)
userRouter.put('/:id', verifyToken, validateUpdateUser, validate, userController.updateUser);

// Delete user (protected)
userRouter.delete('/:id', verifyToken, userController.deleteUser);

export default userRouter;