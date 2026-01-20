import { Router } from 'express';
import * as courseController from '../controllers/course.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { validateCreateCourse, validate } from '../utils/validators.js';

const courseRouter = Router();

// Get all courses
courseRouter.get('/', courseController.getAllCourses);

// Get course by ID
courseRouter.get('/:id', courseController.getCourseById);

// Get user's courses
courseRouter.get('/user/:userId', courseController.getUserCourses);

// Create course (protected)
courseRouter.post('/', verifyToken, validateCreateCourse, validate, courseController.createCourse);

// Update course (protected)
courseRouter.put('/:id', verifyToken, courseController.updateCourse);

// Delete course (protected)
courseRouter.delete('/:id', verifyToken, courseController.deleteCourse);

// Enroll in course (protected)
courseRouter.post('/:courseId/enroll', verifyToken, courseController.enrollCourse);

// Unenroll from course (protected)
courseRouter.post('/:courseId/unenroll', verifyToken, courseController.unenrollCourse);

// Cancel course (protected)
courseRouter.put('/:id/cancel', verifyToken, courseController.cancelCourse);

export default courseRouter;