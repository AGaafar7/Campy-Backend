import { body, validationResult } from 'express-validator';
import { sendError } from './responseHandler.js';

// Validation middleware
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendError(res, 400, errors.array()[0].msg);
    }
    next();
};

// Auth validators
export const validateSignUp = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .trim()
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

export const validateSignIn = [
    body('email')
        .trim()
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required'),
];

// Course validators
export const validateCreateCourse = [
    body('courseId')
        .trim()
        .notEmpty().withMessage('Course ID is required'),
    body('title')
        .trim()
        .notEmpty().withMessage('Course title is required')
        .isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
    body('duration')
        .isInt({ min: 1 }).withMessage('Duration must be at least 1 hour'),
    body('instructor')
        .notEmpty().withMessage('Instructor is required'),
    body('price')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
];

// Lesson validators
export const validateCreateLesson = [
    body('lessonId')
        .trim()
        .notEmpty().withMessage('Lesson ID is required'),
    body('courseId')
        .notEmpty().withMessage('Course ID is required'),
    body('title')
        .trim()
        .notEmpty().withMessage('Lesson title is required')
        .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
    body('content')
        .notEmpty().withMessage('Content is required'),
    body('duration')
        .isInt({ min: 1 }).withMessage('Duration must be at least 1 minute'),
    body('order')
        .isInt({ min: 1 }).withMessage('Order must be a positive number'),
];

// User validators
export const validateUpdateUser = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Please provide a valid email'),
];
