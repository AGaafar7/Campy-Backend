import Progress from '../models/progress.model.js';
import Course from '../models/course.model.js';
import User from '../models/user.model.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { AppError, asyncHandler } from '../utils/errorHandler.js';
import mongoose from 'mongoose';

// Get user's progress for a specific course
export const getProgressByCourse = asyncHandler(async (req, res) => {
    const { userId, courseId } = req.params;

    const progress = await Progress.findOne({ userId, courseId })
        .populate('completedLessons.lessonId');

    if (!progress) {
        throw new AppError('Progress not found', 404);
    }

    sendSuccess(res, 200, 'Progress retrieved successfully', progress);
});

// Get all courses progress for a user
export const getAllUserProgress = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const allProgress = await Progress.find({ userId })
        .populate('courseId', 'title description');

    sendSuccess(res, 200, 'All progress retrieved successfully', allProgress);
});

// Mark a lesson as completed
export const completeLesson = asyncHandler(async (req, res) => {
    const { userId, courseId, lessonId } = req.body;

    if (!userId || !courseId || !lessonId) {
        throw new AppError('userId, courseId, and lessonId are required', 400);
    }

    // Find or create progress record
    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new AppError('Course not found', 404);
        }

        progress = await Progress.create({
            userId,
            courseId,
            completedLessons: [],
            overallProgress: 0,
            isCompleted: false,
        });
    }

    // Check if lesson already completed
    const alreadyCompleted = progress.completedLessons.some(
        lesson => lesson.lessonId.toString() === lessonId
    );

    if (alreadyCompleted) {
       return sendSuccess(res, 200, 'Lesson already completed', progress);
    }

    // Add lesson to completed lessons
    progress.completedLessons.push({
        lessonId,
        completedAt: new Date(),
    });

    // Calculate overall progress
    const course = await Course.findById(courseId)
        .populate('lessons');
    const totalLessons = course.lessons.length;
    const completedCount = progress.completedLessons.length;
    progress.overallProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    // Mark as completed if all lessons done
    if (completedCount === totalLessons && totalLessons > 0) {
        progress.isCompleted = true;
        progress.completedAt = new Date();

        // Update user's course completion status
        await User.updateOne(
    { 
        _id: userId, 
        "coursesEnrolled.courseId": courseId // Find the user AND the specific enrollment
    },
    {
        $set: {
            "coursesEnrolled.$.completedAt": new Date(), // Use '$' to target the matched element
        }
    }
);
    }

    await progress.save();

    sendSuccess(res, 200, 'Lesson marked as completed', progress);
});

// Reset progress for a course
export const resetProgress = asyncHandler(async (req, res) => {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
        throw new AppError('userId and courseId are required', 400);
    }

    const progress = await Progress.findOneAndUpdate(
        { userId, courseId },
        {
            completedLessons: [],
            overallProgress: 0,
            isCompleted: false,
            completedAt: null,
        },
        { new: true }
    );

    if (!progress) {
        throw new AppError('Progress record not found', 404);
    }

    sendSuccess(res, 200, 'Progress reset successfully', progress);
});

// Get course completion statistics
export const getCourseStats = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
        throw new AppError('Course not found', 404);
    }

    const progressRecords = await Progress.find({ courseId });

    const stats = {
        totalEnrolled: progressRecords.length,
        completed: progressRecords.filter(p => p.isCompleted).length,
        inProgress: progressRecords.filter(p => !p.isCompleted && p.overallProgress > 0).length,
        notStarted: progressRecords.filter(p => p.overallProgress === 0).length,
        averageProgress: progressRecords.length > 0
            ? Math.round(progressRecords.reduce((sum, p) => sum + p.overallProgress, 0) / progressRecords.length)
            : 0,
    };

    sendSuccess(res, 200, 'Course statistics retrieved successfully', stats);
});
