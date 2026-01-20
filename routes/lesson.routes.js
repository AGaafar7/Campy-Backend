import { Router } from 'express';
import * as lessonController from '../controllers/lesson.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { validateCreateLesson, validate } from '../utils/validators.js';

const lessonRouter = Router();

// Get all lessons
lessonRouter.get('/', lessonController.getAllLessons);

// Get lessons by course
lessonRouter.get('/course/:courseId', lessonController.getLessonsByCourse);

// Get lesson by ID
lessonRouter.get('/:id', lessonController.getLessonById);

// Create lesson (protected)
lessonRouter.post('/', verifyToken, validateCreateLesson, validate, lessonController.createLesson);

// Update lesson (protected)
lessonRouter.put('/:id', verifyToken, lessonController.updateLesson);

// Delete lesson (protected)
lessonRouter.delete('/:id', verifyToken, lessonController.deleteLesson);

export default lessonRouter;
