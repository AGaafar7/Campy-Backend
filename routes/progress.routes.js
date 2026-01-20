import { Router } from 'express';
import * as progressController from '../controllers/progress.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const progressRouter = Router();

// Get user's progress for a specific course
progressRouter.get('/:userId/:courseId', verifyToken, progressController.getProgressByCourse);

// Get all courses progress for a user
progressRouter.get('/user/:userId', verifyToken, progressController.getAllUserProgress);

// Get course statistics
progressRouter.get('/course/:courseId/stats', progressController.getCourseStats);

// Mark a lesson as completed (protected)
progressRouter.post('/complete-lesson', verifyToken, progressController.completeLesson);

// Reset progress for a course (protected)
progressRouter.post('/reset', verifyToken, progressController.resetProgress);

export default progressRouter;
